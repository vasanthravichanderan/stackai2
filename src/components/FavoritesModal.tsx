import React from 'react';
import { X, MapPin, Trash2, Bookmark } from 'lucide-react';
import { GeoLocation } from '../types';
import { POPULAR_CITIES } from '../services/weatherApi';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: GeoLocation[];
  onSelectCity: (city: GeoLocation) => void;
  onRemoveFavorite: (id: number) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onSelectCity,
  onRemoveFavorite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Saved Locations
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {favorites.length} saved place{favorites.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List */}
        <div className="p-5 overflow-y-auto flex-1 divide-y divide-slate-800/60 space-y-2">
          {favorites.length > 0 ? (
            favorites.map((city) => (
              <div
                key={city.id}
                className="pt-2 first:pt-0 flex items-center justify-between gap-3 group"
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className="flex-1 flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800/80 transition text-left"
                >
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-sm">
                      {city.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {[city.admin1, city.country].filter(Boolean).join(', ')}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onRemoveFavorite(city.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-rose-950/40 transition"
                  title="Remove location"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-30 text-blue-400" />
              <p className="text-sm font-semibold text-slate-200">No saved locations yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                Search for a city and click the bookmark icon to save your favorite weather locations for quick access.
              </p>

              <div className="mt-6 text-left">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Or pick a popular city:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CITIES.slice(0, 6).map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        onSelectCity(city);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 rounded-xl hover:bg-blue-600 hover:text-white transition"
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
