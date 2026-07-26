import React from 'react';
import { MapPin, Bookmark, BookmarkCheck, ArrowUp, ArrowDown, Thermometer, Calendar } from 'lucide-react';
import { TempUnit, WeatherData } from '../types';
import { getWeatherConditionInfo, formatTemp } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  weather: WeatherData;
  unit: TempUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  unit,
  isFavorite,
  onToggleFavorite,
}) => {
  const current = weather.current;
  const location = weather.location;
  const condition = getWeatherConditionInfo(current.weather_code, current.is_day);

  // High / Low for today from daily array
  const maxTempToday = weather.daily.temperature_2m_max?.[0] ?? current.temperature;
  const minTempToday = weather.daily.temperature_2m_min?.[0] ?? current.temperature;

  // Local time formatting using location timezone
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: weather.timezone !== 'auto' ? weather.timezone : undefined,
  });

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    timeZone: weather.timezone !== 'auto' ? weather.timezone : undefined,
  });

  return (
    <div className="relative overflow-hidden rounded-[32px] p-6 sm:p-8 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 border border-blue-500/20 text-white shadow-2xl shadow-blue-900/40 transition-all duration-300">
      {/* Glow effect in background */}
      <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Location & Favorite Button */}
      <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-2xl sm:text-3xl tracking-tight">
            <MapPin className="w-6 h-6 text-blue-300 shrink-0" />
            <span>{location.name}</span>
            {location.country_code && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-blue-200 border border-white/10 uppercase tracking-wider">
                {location.country_code}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mt-1 font-medium">
            <span>{[location.admin1, location.country].filter(Boolean).join(', ')}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
              {formattedDate}, {formattedTime}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold border transition active:scale-95 shadow-md ${
            isFavorite
              ? 'bg-amber-500 text-white border-amber-400 shadow-amber-500/30'
              : 'bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20'
          }`}
          title={isFavorite ? 'Remove from Saved Locations' : 'Save Location'}
        >
          {isFavorite ? (
            <>
              <BookmarkCheck className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">Saved</span>
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Save City</span>
            </>
          )}
        </button>
      </div>

      {/* Main Temperature & Visual Condition */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Temperature Display */}
        <div className="flex items-baseline gap-4">
          <div className="text-7xl sm:text-8xl font-light text-white tracking-tighter leading-none">
            {formatTemp(current.temperature, unit)}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-200">
              <Thermometer className="w-4 h-4 text-blue-300" />
              <span>Feels like {formatTemp(current.apparent_temperature, unit)}</span>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300 pt-1">
              <span className="flex items-center text-emerald-300">
                <ArrowUp className="w-3.5 h-3.5 mr-0.5" /> High {formatTemp(maxTempToday, unit)}
              </span>
              <span className="flex items-center text-cyan-300">
                <ArrowDown className="w-3.5 h-3.5 mr-0.5" /> Low {formatTemp(minTempToday, unit)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Weather Condition Badge & Description */}
        <div className="flex flex-col md:items-end justify-center">
          <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl shadow-lg">
            <div className="p-2.5 rounded-xl bg-slate-900/60 shadow-md text-blue-300">
              <WeatherIcon name={condition.iconName} className="w-10 h-10" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">
                {condition.label}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xs mt-0.5 leading-snug">
                {condition.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
