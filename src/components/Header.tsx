import React from 'react';
import { CloudSun, Bookmark, Compass } from 'lucide-react';
import { GeoLocation, TempUnit } from '../types';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  unit: TempUnit;
  onToggleUnit: () => void;
  onSelectCity: (city: GeoLocation) => void;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  onToggleUnit,
  onSelectCity,
  onUseCurrentLocation,
  isLocating,
  favoritesCount,
  onOpenFavorites,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2.5 group cursor-pointer">
              <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <CloudSun className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                  Aura<span className="text-blue-400">Weather</span>
                </h1>
                <p className="text-[11px] text-slate-400 font-medium">
                  Weather Intelligence
                </p>
              </div>
            </div>

            {/* Mobile Controls Right side */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={onOpenFavorites}
                className="relative p-2.5 text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition"
                title="Saved Locations"
              >
                <Bookmark className="w-5 h-5 text-blue-400" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold bg-blue-500 text-white rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onToggleUnit}
                className="px-3 py-2 text-xs font-bold bg-slate-900 text-slate-200 rounded-xl border border-slate-800 hover:border-blue-500 transition"
              >
                °{unit}
              </button>
            </div>
          </div>

          {/* Search Bar Container */}
          <div className="w-full md:max-w-xl">
            <SearchBar
              onSelectCity={onSelectCity}
              onUseCurrentLocation={onUseCurrentLocation}
              isLocating={isLocating}
            />
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenFavorites}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-slate-700 transition active:scale-95 shadow-xs"
            >
              <Bookmark className="w-4 h-4 text-blue-400" />
              <span>Saved Places</span>
              {favoritesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-blue-500 text-white rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onToggleUnit}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-slate-700 transition active:scale-95 shadow-xs"
              title="Toggle Temperature Unit"
            >
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>°{unit}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
