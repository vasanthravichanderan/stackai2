import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2, Navigation, Clock, Building } from 'lucide-react';
import { GeoLocation } from '../types';
import { searchCities, POPULAR_CITIES } from '../services/weatherApi';

interface SearchBarProps {
  onSelectCity: (city: GeoLocation) => void;
  onUseCurrentLocation: () => void;
  isLocating?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCity,
  onUseCurrentLocation,
  isLocating = false,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<GeoLocation[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wi_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const cities = await searchCities(query);
        setResults(cities);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: GeoLocation) => {
    onSelectCity(city);
    setIsOpen(false);
    setQuery('');

    // Save to recent
    try {
      const updated = [
        city,
        ...recentSearches.filter((item) => item.id !== city.id && item.name !== city.name),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('wi_recent_searches', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={dropdownRef}>
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search city, region or country..."
          className="w-full pl-11 pr-28 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-100 placeholder-slate-400 transition-all text-sm sm:text-base"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                inputRef.current?.focus();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onUseCurrentLocation();
              setIsOpen(false);
            }}
            disabled={isLocating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-400 bg-blue-950/60 hover:bg-blue-900/60 rounded-xl border border-blue-800/60 transition active:scale-95 disabled:opacity-50"
            title="Use Current Location"
          >
            {isLocating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Navigation className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">My Location</span>
          </button>
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/60 max-h-96 overflow-y-auto">
          {/* Active Search Results */}
          {results.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Matching Cities ({results.length})
              </div>
              {results.map((city) => (
                <button
                  key={`${city.id}-${city.latitude}-${city.longitude}`}
                  onClick={() => handleSelect(city)}
                  className="w-full flex items-center justify-between p-2.5 hover:bg-slate-800/80 rounded-xl transition group text-left"
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 mt-0.5 text-blue-400 group-hover:scale-110 transition" />
                    <div>
                      <div className="font-medium text-slate-100 text-sm">
                        {city.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {[city.admin1, city.country].filter(Boolean).join(', ')}
                      </div>
                    </div>
                  </div>
                  {city.country_code && (
                    <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800 text-slate-300">
                      {city.country_code}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* No results state */}
          {query.trim().length >= 2 && !loading && results.length === 0 && (
            <div className="p-6 text-center text-slate-400 text-sm">
              <Building className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              City not found or network error
              <p className="text-xs text-slate-400 mt-1">
                Try typing a city name like &quot;London&quot;, &quot;Tokyo&quot;, or &quot;Berlin&quot;.
              </p>
            </div>
          )}

          {/* Recent Searches */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Recent Searches
              </div>
              {recentSearches.map((city) => (
                <button
                  key={`recent-${city.id}-${city.name}`}
                  onClick={() => handleSelect(city)}
                  className="w-full flex items-center justify-between p-2.5 hover:bg-slate-800/80 rounded-xl transition group text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition" />
                    <span className="font-medium text-slate-200 text-sm">
                      {city.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {[city.admin1, city.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Popular City Shortcuts */}
          {!query.trim() && (
            <div className="p-3 bg-slate-900/50">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Popular Cities
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={`popular-${city.id}`}
                    onClick={() => handleSelect(city)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700/80 rounded-lg hover:border-blue-500 hover:text-blue-400 transition"
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
