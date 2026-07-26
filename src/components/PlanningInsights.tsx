import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { WeatherData } from '../types';
import { generatePlanningInsights, calculateOutdoorActivities } from '../utils/planningEngine';
import { WeatherIcon } from './WeatherIcon';

interface PlanningInsightsProps {
  weather: WeatherData;
}

export const PlanningInsights: React.FC<PlanningInsightsProps> = ({ weather }) => {
  const insights = generatePlanningInsights(weather);
  const activities = calculateOutdoorActivities(weather);

  const getAlertBadge = (type: 'info' | 'warning' | 'success' | 'alert') => {
    switch (type) {
      case 'alert':
        return {
          bg: 'bg-rose-950/40 border-rose-900/60 text-rose-200',
          badge: 'bg-rose-500 text-white',
          icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
        };
      case 'warning':
        return {
          bg: 'bg-amber-950/40 border-amber-900/60 text-amber-200',
          badge: 'bg-amber-500 text-white',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
        };
      case 'success':
        return {
          bg: 'bg-emerald-950/40 border-emerald-900/60 text-emerald-200',
          badge: 'bg-emerald-500 text-white',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-slate-900 border-slate-800 text-slate-200',
          badge: 'bg-blue-500 text-white',
          icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 border border-blue-500/20 text-white rounded-[32px] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <Sparkles className="w-48 h-48" />
        </div>
        <div className="relative z-10 flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Smart Weather Intelligence
            </h2>
            <p className="text-xs text-blue-200 font-medium">
              Personalized recommendations for outdoor plans & wardrobe
            </p>
          </div>
        </div>
      </div>

      {/* 1. Planning Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item) => {
          const style = getAlertBadge(item.type);
          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border shadow-xs transition-all flex flex-col justify-between ${style.bg}`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    {style.icon}
                    <h3 className="font-bold text-sm sm:text-base tracking-tight text-white">
                      {item.title}
                    </h3>
                  </div>

                  <div className="p-2 rounded-2xl bg-slate-800 border border-slate-700/60 text-blue-400 shadow-xs shrink-0">
                    <WeatherIcon name={item.icon} className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs font-semibold mb-1 opacity-90 text-slate-200">
                  {item.summary}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Outdoor Activity Suitability Index */}
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">
              Outdoor Activity Suitability
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Based on current conditions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-blue-400">
                    <WeatherIcon name={act.icon} className="w-5 h-5" />
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${act.color}`}
                  >
                    {act.label} ({act.score}%)
                  </span>
                </div>

                <h4 className="font-bold text-white text-xs mb-1">
                  {act.name}
                </h4>

                <p className="text-[11px] text-slate-400 leading-snug">
                  {act.tip}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${act.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
