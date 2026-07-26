import React, { useState } from 'react';
import { CalendarDays, Umbrella, ChevronDown, ChevronUp, Wind, Sun, Sunrise, Sunset } from 'lucide-react';
import { TempUnit, WeatherData } from '../types';
import { getWeatherConditionInfo, formatTemp, formatWindSpeed } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface DailyForecastProps {
  weather: WeatherData;
  unit: TempUnit;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ weather, unit }) => {
  const daily = weather.daily;
  const [expandedDayIndex, setExpandedDayIndex] = useState<number | null>(null);

  if (!daily || !daily.time || daily.time.length === 0) {
    return null;
  }

  // Find min & max across the week for relative temperature bar rendering
  const minWeekTemp = Math.min(...daily.temperature_2m_min);
  const maxWeekTemp = Math.max(...daily.temperature_2m_max);
  const tempRange = maxWeekTemp - minWeekTemp || 1;

  const toggleExpand = (index: number) => {
    setExpandedDayIndex(expandedDayIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold text-white">
            7-Day Forecast
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">Click day for details</span>
      </div>

      <div className="space-y-2.5">
        {daily.time.slice(0, 7).map((dateStr, index) => {
          const date = new Date(dateStr);
          const isToday = index === 0;

          const dayName = isToday
            ? 'Today'
            : date.toLocaleDateString('en-US', { weekday: 'short' });

          const dateFormatted = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });

          const code = daily.weather_code[index] ?? 0;
          const condition = getWeatherConditionInfo(code, 1);
          const minTemp = daily.temperature_2m_min[index];
          const maxTemp = daily.temperature_2m_max[index];
          const rainProb = daily.precipitation_probability_max?.[index] ?? 0;
          const rainSum = daily.precipitation_sum?.[index] ?? 0;
          const uvMax = daily.uv_index_max?.[index] ?? 0;
          const windMax = daily.wind_speed_10m_max?.[index] ?? 0;
          const sunrise = daily.sunrise?.[index];
          const sunset = daily.sunset?.[index];

          // Calculate bar left offset and width percentage
          const leftPercent = Math.max(0, ((minTemp - minWeekTemp) / tempRange) * 100);
          const widthPercent = Math.max(10, ((maxTemp - minTemp) / tempRange) * 100);

          const isExpanded = expandedDayIndex === index;

          return (
            <div
              key={dateStr}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isToday
                  ? 'bg-blue-950/40 border-blue-800/60'
                  : 'bg-slate-800/30 border-slate-800 hover:bg-slate-800/60'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleExpand(index)}
                className="w-full p-3.5 flex items-center justify-between gap-3 text-left focus:outline-none"
              >
                {/* Day & Date */}
                <div className="w-24 shrink-0">
                  <div
                    className={`text-sm font-bold ${
                      isToday ? 'text-blue-400' : 'text-white'
                    }`}
                  >
                    {dayName}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {dateFormatted}
                  </div>
                </div>

                {/* Weather Condition Icon & Label */}
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-300">
                    <WeatherIcon name={condition.iconName} className="w-5 h-5" />
                  </div>
                  <div className="truncate hidden sm:block">
                    <span className="text-xs font-semibold text-slate-200">
                      {condition.label}
                    </span>
                  </div>

                  {rainProb > 20 && (
                    <span className="hidden xs:flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-blue-400 bg-blue-950/80 rounded-full border border-blue-800/60 shrink-0">
                      <Umbrella className="w-3 h-3" /> {rainProb}%
                    </span>
                  )}
                </div>

                {/* Relative Temp Range Visualizer Bar */}
                <div className="flex items-center gap-3 w-40 sm:w-56 shrink-0 justify-end">
                  <span className="text-xs font-bold text-slate-400 w-8 text-right">
                    {formatTemp(minTemp, unit)}
                  </span>

                  {/* Temperature Bar */}
                  <div className="relative flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                      }}
                    />
                  </div>

                  <span className="text-xs font-bold text-white w-8">
                    {formatTemp(maxTemp, unit)}
                  </span>

                  <div className="text-slate-400 pl-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-blue-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Details View */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800 bg-slate-900/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <span className="text-slate-400 block font-medium">Precipitation</span>
                    <span className="font-bold text-slate-200">
                      {rainSum} mm ({rainProb}% prob)
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <span className="text-slate-400 block font-medium flex items-center gap-1">
                      <Wind className="w-3 h-3 text-blue-400" /> Wind Max
                    </span>
                    <span className="font-bold text-slate-200">
                      {formatWindSpeed(windMax)}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <span className="text-slate-400 block font-medium flex items-center gap-1">
                      <Sun className="w-3 h-3 text-amber-400" /> Peak UV
                    </span>
                    <span className="font-bold text-slate-200">
                      {uvMax.toFixed(1)} Index
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <span className="text-slate-400 block font-medium">Daylight Hours</span>
                    <span className="font-bold text-slate-200 flex items-center gap-1">
                      <Sunrise className="w-3 h-3 text-amber-400" />
                      {sunrise ? new Date(sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                      <Sunset className="w-3 h-3 text-orange-400 ml-1" />
                      {sunset ? new Date(sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
