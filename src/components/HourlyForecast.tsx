import React from 'react';
import { Clock, Umbrella } from 'lucide-react';
import { TempUnit, WeatherData } from '../types';
import { getWeatherConditionInfo, formatTemp } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  weather: WeatherData;
  unit: TempUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ weather, unit }) => {
  const hourly = weather.hourly;
  if (!hourly || !hourly.time || hourly.time.length === 0) {
    return null;
  }

  // Find current hour index or slice first 24 hours
  const nowIso = new Date().toISOString().slice(0, 13);
  let startIndex = hourly.time.findIndex((t) => t.startsWith(nowIso));
  if (startIndex === -1) startIndex = 0;

  const next24Hours = hourly.time.slice(startIndex, startIndex + 24).map((time, idx) => {
    const realIdx = startIndex + idx;
    const date = new Date(time);
    const hourLabel =
      idx === 0
        ? 'Now'
        : date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
          });

    const isDay = hourly.is_day ? hourly.is_day[realIdx] ?? 1 : 1;
    const code = hourly.weather_code[realIdx] ?? 0;
    const temp = hourly.temperature_2m[realIdx] ?? 0;
    const rainProb = hourly.precipitation_probability?.[realIdx] ?? 0;
    const condition = getWeatherConditionInfo(code, isDay);

    return {
      time,
      hourLabel,
      temp,
      rainProb,
      condition,
      isNow: idx === 0,
    };
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold text-white">
            24-Hour Forecast
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">Hourly Breakdown</span>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-800">
        {next24Hours.map((item) => (
          <div
            key={item.time}
            className={`flex-none w-20 flex flex-col items-center p-3 rounded-2xl border transition-all ${
              item.isNow
                ? 'bg-blue-950/70 border-blue-800 ring-2 ring-blue-500/20'
                : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80'
            }`}
          >
            <span
              className={`text-xs font-semibold ${
                item.isNow ? 'text-blue-400' : 'text-slate-400'
              }`}
            >
              {item.hourLabel}
            </span>

            <div className={`my-2 text-blue-300`}>
              <WeatherIcon name={item.condition.iconName} className="w-7 h-7" />
            </div>

            <span className="text-base font-bold text-white">
              {formatTemp(item.temp, unit)}
            </span>

            {/* Precipitation Prob */}
            <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-blue-400">
              {item.rainProb > 15 ? (
                <>
                  <Umbrella className="w-3 h-3 shrink-0" />
                  <span>{item.rainProb}%</span>
                </>
              ) : (
                <span className="text-slate-600 text-[10px]">--</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
