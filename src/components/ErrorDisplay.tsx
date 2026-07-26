import React from 'react';
import { AlertTriangle, RefreshCw, MapPin } from 'lucide-react';
import { POPULAR_CITIES } from '../services/weatherApi';
import { GeoLocation } from '../types';

interface ErrorDisplayProps {
  message?: string;
  onRetry: () => void;
  onSelectCity: (city: GeoLocation) => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message = 'City not found or network error',
  onRetry,
  onSelectCity,
}) => {
  return (
    <div className="bg-slate-900 border border-rose-900/50 rounded-3xl p-8 shadow-2xl max-w-xl mx-auto text-center my-8">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        Unable to Load Weather Data
      </h3>

      <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto leading-relaxed">
        {message}. Please verify your internet connection or try searching for another city name.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl text-sm shadow-lg shadow-blue-600/30 transition active:scale-95"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>

      <div className="pt-6 border-t border-slate-800 text-left">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-400" /> Popular Cities You Can Try:
        </span>
        <div className="flex flex-wrap gap-2">
          {POPULAR_CITIES.slice(0, 6).map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectCity(city)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 border border-slate-700/80 hover:bg-blue-600 hover:text-white text-slate-300 rounded-xl transition"
            >
              {city.name}, {city.country}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
