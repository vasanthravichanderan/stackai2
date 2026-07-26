import { useState, useEffect, useCallback } from 'react';
import { GeoLocation, TempUnit, WeatherData } from './types';
import { POPULAR_CITIES, fetchWeatherData, getLocationFromCoordinates } from './services/weatherApi';
import { Header } from './components/Header';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { WeatherMetricsGrid } from './components/WeatherMetricsGrid';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { PlanningInsights } from './components/PlanningInsights';
import { FavoritesModal } from './components/FavoritesModal';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Loader2, RefreshCw, Sparkles, LayoutDashboard, Compass } from 'lucide-react';

export default function App() {
  // State initialization
  const [selectedCity, setSelectedCity] = useState<GeoLocation>(() => {
    try {
      const saved = localStorage.getItem('wi_selected_city');
      return saved ? JSON.parse(saved) : POPULAR_CITIES[0];
    } catch {
      return POPULAR_CITIES[0];
    }
  });

  const [unit, setUnit] = useState<TempUnit>(() => {
    try {
      const saved = localStorage.getItem('wi_unit');
      return saved === 'F' ? 'F' : 'C';
    } catch {
      return 'C';
    }
  });

  const [favorites, setFavorites] = useState<GeoLocation[]>(() => {
    try {
      const saved = localStorage.getItem('wi_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'insights'>('overview');

  // Fetch weather data for currently selected city
  const loadWeather = useCallback(async (city: GeoLocation) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city.latitude, city.longitude, city);
      setWeatherData(data);

      // Save as last selected city
      try {
        localStorage.setItem('wi_selected_city', JSON.stringify(city));
      } catch (e) {
        console.error(e);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'City not found or network error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWeather(selectedCity);
  }, [selectedCity, loadWeather]);

  // Handle unit toggle
  const handleToggleUnit = () => {
    const nextUnit = unit === 'C' ? 'F' : 'C';
    setUnit(nextUnit);
    try {
      localStorage.setItem('wi_unit', nextUnit);
    } catch (e) {
      console.error(e);
    }
  };

  // Handle city selection
  const handleSelectCity = (city: GeoLocation) => {
    setSelectedCity(city);
  };

  // Handle Geolocation / Current Location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const detectedCity = await getLocationFromCoordinates(lat, lon);
          setSelectedCity(detectedCity);
        } catch (err) {
          console.error(err);
          setError('Unable to detect your location. Please search manually.');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.error(err);
        setIsLocating(false);
        alert('Location access denied or unavailable. Please search for a city.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Toggle favorite city
  const isFavorite = favorites.some((f) => f.id === selectedCity.id || (f.name === selectedCity.name && f.country === selectedCity.country));

  const handleToggleFavorite = () => {
    let updated: GeoLocation[];
    if (isFavorite) {
      updated = favorites.filter((f) => f.id !== selectedCity.id && f.name !== selectedCity.name);
    } else {
      updated = [selectedCity, ...favorites];
    }
    setFavorites(updated);
    try {
      localStorage.setItem('wi_favorites', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveFavorite = (id: number) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    try {
      localStorage.setItem('wi_favorites', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Header */}
      <Header
        unit={unit}
        onToggleUnit={handleToggleUnit}
        onSelectCity={handleSelectCity}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLocating={isLocating}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main App Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Quick Location Pills & Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          {/* Quick Popular Cities Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-blue-400" /> Quick View:
            </span>
            {POPULAR_CITIES.slice(0, 5).map((city) => (
              <button
                key={`pill-${city.id}`}
                type="button"
                onClick={() => handleSelectCity(city)}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all shrink-0 border ${
                  selectedCity.name === city.name
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-slate-800 text-blue-400 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Forecast Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'insights'
                  ? 'bg-slate-800 text-blue-400 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Planning</span>
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-6 animate-pulse py-12 text-center">
            <div className="h-64 bg-slate-900 border border-slate-800 rounded-3xl w-full flex items-center justify-center">
              <div className="flex items-center gap-3 text-slate-400 font-medium text-sm">
                <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                <span>Fetching real-time weather from Open-Meteo...</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-28 bg-slate-900 border border-slate-800 rounded-2xl" />
              ))}
            </div>
          </div>
        )}

        {/* Error View */}
        {!loading && error && (
          <ErrorDisplay
            message={error}
            onRetry={() => loadWeather(selectedCity)}
            onSelectCity={handleSelectCity}
          />
        )}

        {/* Weather Content */}
        {!loading && !error && weatherData && (
          <div className="space-y-6">
            {/* Top Refresh Row */}
            <div className="flex items-center justify-end gap-2 text-xs text-slate-400">
              <span>Updated just now</span>
              <button
                type="button"
                onClick={() => loadWeather(selectedCity)}
                className="p-1.5 hover:text-blue-400 transition rounded-lg hover:bg-slate-800"
                title="Refresh Weather"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Overview View Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Hero Current Weather */}
                <CurrentWeatherCard
                  weather={weatherData}
                  unit={unit}
                  isFavorite={isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />

                {/* Detailed Metrics Grid */}
                <WeatherMetricsGrid weather={weatherData} unit={unit} />

                {/* 24-Hour Forecast */}
                <HourlyForecast weather={weatherData} unit={unit} />

                {/* 7-Day Forecast */}
                <DailyForecast weather={weatherData} unit={unit} />

                {/* Bottom Smart Planning Preview */}
                <div className="pt-4">
                  <PlanningInsights weather={weatherData} />
                </div>
              </>
            )}

            {/* Smart Planning Dedicated Tab */}
            {activeTab === 'insights' && (
              <div className="space-y-6">
                <CurrentWeatherCard
                  weather={weatherData}
                  unit={unit}
                  isFavorite={isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />
                <PlanningInsights weather={weatherData} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onSelectCity={handleSelectCity}
        onRemoveFavorite={handleRemoveFavorite}
      />

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-800/80 text-center text-xs text-slate-400 space-y-1">
        <p>Powered by Open-Meteo Geocoding & Weather Forecast APIs</p>
        <p className="text-[11px] text-slate-400">No secret keys required • Real-time public weather data</p>
      </footer>
    </div>
  );
}
