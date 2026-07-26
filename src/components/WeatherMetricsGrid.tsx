import React from 'react';
import {
  Droplets,
  Wind,
  Sun,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Navigation,
} from 'lucide-react';
import { TempUnit, WeatherData } from '../types';
import {
  formatWindSpeed,
  getWindDirectionLabel,
  getUvCategory,
  formatTemp,
} from '../utils/weatherCodes';

interface WeatherMetricsGridProps {
  weather: WeatherData;
  unit: TempUnit;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({ weather, unit }) => {
  const current = weather.current;
  const daily = weather.daily;
  const hourly = weather.hourly;

  // Current UV index from hourly data nearest current hour or max today
  const currentUv = hourly.uv_index?.[0] ?? daily.uv_index_max?.[0] ?? 0;
  const uvCategory = getUvCategory(currentUv);

  // Sunrise and Sunset times today
  const sunriseIso = daily.sunrise?.[0];
  const sunsetIso = daily.sunset?.[0];

  const formatTimeOnly = (isoStr?: string) => {
    if (!isoStr) return '--:--';
    try {
      const d = new Date(isoStr);
      return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '--:--';
    }
  };

  const sunriseFormatted = formatTimeOnly(sunriseIso);
  const sunsetFormatted = formatTimeOnly(sunsetIso);

  // Calculate daylight percentage progress if available
  let daylightProgress = 50;
  if (sunriseIso && sunsetIso) {
    try {
      const now = new Date().getTime();
      const sr = new Date(sunriseIso).getTime();
      const ss = new Date(sunsetIso).getTime();
      if (now <= sr) daylightProgress = 0;
      else if (now >= ss) daylightProgress = 100;
      else daylightProgress = Math.round(((now - sr) / (ss - sr)) * 100);
    } catch {
      daylightProgress = 50;
    }
  }

  // Dew point from current hourly or calculated approximation
  const dewPoint = hourly.dew_point_2m?.[0] ?? current.temperature - (100 - current.relative_humidity) / 5;

  // Visibility in km
  const visibilityMeters = hourly.visibility?.[0] ?? 10000;
  const visibilityKm = (visibilityMeters / 1000).toFixed(1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {/* 1. Humidity & Dew Point */}
      <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-sm hover:border-slate-700 hover:bg-slate-800/50 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Humidity
          </span>
          <Droplets className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-white">
          {current.relative_humidity}%
        </div>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Dew Point: {formatTemp(dewPoint, unit)}
        </p>
      </div>

      {/* 2. Wind & Direction */}
      <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-sm hover:border-slate-700 hover:bg-slate-800/50 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Wind
          </span>
          <Wind className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-white">
          {formatWindSpeed(current.wind_speed_10m)}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1 font-medium">
          <Navigation
            className="w-3 h-3 text-blue-400"
            style={{ transform: `rotate(${current.wind_direction_10m}deg)` }}
          />
          <span>{getWindDirectionLabel(current.wind_direction_10m)} ({current.wind_direction_10m}°)</span>
        </div>
      </div>

      {/* 3. UV Index */}
      <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-sm hover:border-slate-700 hover:bg-slate-800/50 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            UV Index
          </span>
          <Sun className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-2xl font-bold text-white">
          {currentUv.toFixed(1)}
        </div>
        <span
          className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full border ${uvCategory.color}`}
        >
          {uvCategory.label}
        </span>
      </div>

      {/* 4. Air Pressure */}
      <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-sm hover:border-slate-700 hover:bg-slate-800/50 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Pressure
          </span>
          <Gauge className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-white">
          {Math.round(current.pressure_msl)} <span className="text-xs font-normal text-slate-400">hPa</span>
        </div>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          {current.pressure_msl >= 1013 ? 'High pressure' : 'Low pressure'}
        </p>
      </div>

      {/* 5. Visibility */}
      <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-sm hover:border-slate-700 hover:bg-slate-800/50 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Visibility
          </span>
          <Eye className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-white">
          {visibilityKm} <span className="text-xs font-normal text-slate-400">km</span>
        </div>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          {Number(visibilityKm) >= 10 ? 'Optimal clarity' : 'Reduced visibility'}
        </p>
      </div>

      {/* 6. Sunrise & Sunset */}
      <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-sm hover:border-slate-700 hover:bg-slate-800/50 transition flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Sun Schedule
          </span>
          <Sunrise className="w-4 h-4 text-amber-400" />
        </div>

        <div className="space-y-1 my-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Sunrise className="w-3 h-3 text-amber-400" /> Rise
            </span>
            <span className="font-bold text-slate-200">{sunriseFormatted}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Sunset className="w-3 h-3 text-orange-400" /> Set
            </span>
            <span className="font-bold text-slate-200">{sunsetFormatted}</span>
          </div>
        </div>

        {/* Sunlight Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${daylightProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
