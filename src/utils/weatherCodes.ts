import { WeatherConditionInfo } from '../types';

export const WMO_WEATHER_CODES: Record<number, WeatherConditionInfo> = {
  0: {
    code: 0,
    label: 'Clear Sky',
    description: 'Bright and clear conditions with optimal visibility.',
    iconName: 'Sun',
    category: 'clear',
    bgGradientLight: 'from-amber-400/20 via-sky-300/15 to-blue-500/10',
    bgGradientDark: 'from-amber-900/30 via-slate-900/40 to-blue-950/30',
    accentColor: 'text-amber-500',
  },
  1: {
    code: 1,
    label: 'Mainly Clear',
    description: 'Mostly sunny with slight scattered high clouds.',
    iconName: 'SunDim',
    category: 'clear',
    bgGradientLight: 'from-sky-400/20 via-blue-300/15 to-indigo-400/10',
    bgGradientDark: 'from-sky-950/30 via-slate-900/40 to-indigo-950/30',
    accentColor: 'text-sky-500',
  },
  2: {
    code: 2,
    label: 'Partly Cloudy',
    description: 'A mix of sunshine and pleasant cloud formations.',
    iconName: 'CloudSun',
    category: 'cloudy',
    bgGradientLight: 'from-sky-400/20 via-slate-200/20 to-blue-400/10',
    bgGradientDark: 'from-sky-950/30 via-slate-900/40 to-blue-950/30',
    accentColor: 'text-sky-400',
  },
  3: {
    code: 3,
    label: 'Overcast',
    description: 'Gloomy sky fully covered by thick cloud cover.',
    iconName: 'Cloud',
    category: 'cloudy',
    bgGradientLight: 'from-slate-400/20 via-gray-300/15 to-zinc-400/10',
    bgGradientDark: 'from-slate-900/40 via-zinc-900/40 to-gray-950/30',
    accentColor: 'text-slate-400',
  },
  45: {
    code: 45,
    label: 'Foggy',
    description: 'Low visibility due to dense lingering ground fog.',
    iconName: 'CloudFog',
    category: 'fog',
    bgGradientLight: 'from-zinc-400/20 via-slate-300/20 to-teal-400/10',
    bgGradientDark: 'from-zinc-900/40 via-slate-900/40 to-teal-950/30',
    accentColor: 'text-teal-400',
  },
  48: {
    code: 48,
    label: 'Depositing Rime Fog',
    description: 'Freezing fog forming frost crystals on cold surfaces.',
    iconName: 'CloudFog',
    category: 'fog',
    bgGradientLight: 'from-teal-300/20 via-cyan-200/15 to-slate-400/10',
    bgGradientDark: 'from-teal-950/30 via-cyan-950/30 to-slate-900/40',
    accentColor: 'text-cyan-400',
  },
  51: {
    code: 51,
    label: 'Light Drizzle',
    description: 'Fine mist-like rain falling gently.',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    bgGradientLight: 'from-sky-400/20 via-blue-400/15 to-cyan-500/10',
    bgGradientDark: 'from-sky-950/30 via-blue-950/40 to-cyan-950/30',
    accentColor: 'text-sky-400',
  },
  53: {
    code: 53,
    label: 'Moderate Drizzle',
    description: 'Steady light rain with damp humidity.',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    bgGradientLight: 'from-blue-500/20 via-sky-400/15 to-indigo-500/10',
    bgGradientDark: 'from-blue-950/40 via-sky-950/30 to-indigo-950/30',
    accentColor: 'text-blue-400',
  },
  55: {
    code: 55,
    label: 'Dense Drizzle',
    description: 'Heavy damp mist reducing visibility and wetting surfaces.',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    bgGradientLight: 'from-indigo-500/20 via-blue-500/15 to-slate-500/10',
    bgGradientDark: 'from-indigo-950/40 via-blue-950/40 to-slate-900/40',
    accentColor: 'text-indigo-400',
  },
  56: {
    code: 56,
    label: 'Light Freezing Drizzle',
    description: 'Slight drizzle that freezes upon contact with icy ground.',
    iconName: 'CloudHail',
    category: 'drizzle',
    bgGradientLight: 'from-cyan-400/20 via-sky-300/15 to-blue-400/10',
    bgGradientDark: 'from-cyan-950/40 via-sky-950/30 to-blue-950/30',
    accentColor: 'text-cyan-300',
  },
  57: {
    code: 57,
    label: 'Dense Freezing Drizzle',
    description: 'Freezing rain causing slick roads and icy surfaces.',
    iconName: 'CloudHail',
    category: 'drizzle',
    bgGradientLight: 'from-cyan-500/20 via-teal-400/15 to-slate-500/10',
    bgGradientDark: 'from-cyan-950/40 via-teal-950/30 to-slate-900/40',
    accentColor: 'text-cyan-400',
  },
  61: {
    code: 61,
    label: 'Slight Rain',
    description: 'Light continuous rainfall. An umbrella is helpful.',
    iconName: 'CloudRain',
    category: 'rain',
    bgGradientLight: 'from-blue-500/20 via-sky-400/15 to-slate-400/10',
    bgGradientDark: 'from-blue-950/40 via-sky-950/30 to-slate-900/40',
    accentColor: 'text-blue-400',
  },
  63: {
    code: 63,
    label: 'Moderate Rain',
    description: 'Steady rain shower. Bring a waterproof raincoat or umbrella.',
    iconName: 'CloudRain',
    category: 'rain',
    bgGradientLight: 'from-blue-600/20 via-indigo-500/15 to-sky-500/10',
    bgGradientDark: 'from-blue-950/50 via-indigo-950/40 to-sky-950/30',
    accentColor: 'text-blue-500',
  },
  65: {
    code: 65,
    label: 'Heavy Rain',
    description: 'Pouring downpours. High accumulation on roads.',
    iconName: 'CloudRainWind',
    category: 'rain',
    bgGradientLight: 'from-indigo-600/25 via-blue-600/20 to-slate-600/15',
    bgGradientDark: 'from-indigo-950/60 via-blue-950/50 to-slate-900/50',
    accentColor: 'text-indigo-400',
  },
  66: {
    code: 66,
    label: 'Light Freezing Rain',
    description: 'Icy precipitation causing hazardous road conditions.',
    iconName: 'CloudHail',
    category: 'rain',
    bgGradientLight: 'from-cyan-600/20 via-blue-500/15 to-slate-500/10',
    bgGradientDark: 'from-cyan-950/50 via-blue-950/40 to-slate-900/40',
    accentColor: 'text-cyan-300',
  },
  67: {
    code: 67,
    label: 'Heavy Freezing Rain',
    description: 'Severe freezing rain leading to heavy ice accumulation.',
    iconName: 'CloudHail',
    category: 'rain',
    bgGradientLight: 'from-cyan-700/25 via-teal-600/20 to-slate-600/15',
    bgGradientDark: 'from-cyan-950/60 via-teal-950/50 to-slate-900/50',
    accentColor: 'text-cyan-400',
  },
  71: {
    code: 71,
    label: 'Slight Snow Fall',
    description: 'Gentle light snow flurries dancing through the air.',
    iconName: 'Snowflake',
    category: 'snow',
    bgGradientLight: 'from-sky-300/20 via-blue-200/15 to-indigo-300/10',
    bgGradientDark: 'from-sky-950/30 via-slate-900/40 to-indigo-950/30',
    accentColor: 'text-sky-300',
  },
  73: {
    code: 73,
    label: 'Moderate Snow Fall',
    description: 'Steady snowfall forming a fresh winter blanket.',
    iconName: 'Snowflake',
    category: 'snow',
    bgGradientLight: 'from-sky-400/20 via-indigo-300/20 to-slate-300/15',
    bgGradientDark: 'from-sky-950/40 via-indigo-950/40 to-slate-900/40',
    accentColor: 'text-sky-200',
  },
  75: {
    code: 75,
    label: 'Heavy Snow Fall',
    description: 'Thick snow storm with rapid winter accumulation.',
    iconName: 'Snowflake',
    category: 'snow',
    bgGradientLight: 'from-blue-400/25 via-sky-300/20 to-slate-400/15',
    bgGradientDark: 'from-blue-950/50 via-sky-950/40 to-slate-900/50',
    accentColor: 'text-sky-100',
  },
  77: {
    code: 77,
    label: 'Snow Grains',
    description: 'Very small flat icy grains falling from clouds.',
    iconName: 'Snowflake',
    category: 'snow',
    bgGradientLight: 'from-sky-300/20 via-slate-300/15 to-blue-300/10',
    bgGradientDark: 'from-sky-950/30 via-slate-900/40 to-blue-950/30',
    accentColor: 'text-sky-300',
  },
  80: {
    code: 80,
    label: 'Slight Rain Showers',
    description: 'Passing rain showers with intermittent clear breaks.',
    iconName: 'CloudSunRain',
    category: 'rain',
    bgGradientLight: 'from-sky-400/20 via-blue-400/15 to-amber-300/10',
    bgGradientDark: 'from-sky-950/30 via-blue-950/30 to-amber-950/20',
    accentColor: 'text-sky-400',
  },
  81: {
    code: 81,
    label: 'Moderate Rain Showers',
    description: 'Brisk rain showers moving across the area.',
    iconName: 'CloudRain',
    category: 'rain',
    bgGradientLight: 'from-blue-500/20 via-sky-500/15 to-slate-400/10',
    bgGradientDark: 'from-blue-950/40 via-sky-950/30 to-slate-900/40',
    accentColor: 'text-blue-400',
  },
  82: {
    code: 82,
    label: 'Violent Rain Showers',
    description: 'Sudden intense rain downpours with strong gusts.',
    iconName: 'CloudRainWind',
    category: 'rain',
    bgGradientLight: 'from-indigo-600/25 via-blue-600/20 to-slate-600/15',
    bgGradientDark: 'from-indigo-950/60 via-blue-950/50 to-slate-900/50',
    accentColor: 'text-indigo-400',
  },
  85: {
    code: 85,
    label: 'Light Snow Showers',
    description: 'Scattered passing snow squalls.',
    iconName: 'Snowflake',
    category: 'snow',
    bgGradientLight: 'from-sky-300/20 via-slate-200/20 to-blue-300/10',
    bgGradientDark: 'from-sky-950/30 via-slate-900/40 to-blue-950/30',
    accentColor: 'text-sky-300',
  },
  86: {
    code: 86,
    label: 'Heavy Snow Showers',
    description: 'Intense snow showers with sudden reduced visibility.',
    iconName: 'Snowflake',
    category: 'snow',
    bgGradientLight: 'from-sky-400/25 via-blue-300/20 to-slate-400/15',
    bgGradientDark: 'from-sky-950/50 via-blue-950/40 to-slate-900/50',
    accentColor: 'text-sky-200',
  },
  95: {
    code: 95,
    label: 'Thunderstorm',
    description: 'Thunderstorm with lightning strikes and heavy rain bursts.',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    bgGradientLight: 'from-amber-500/20 via-purple-600/20 to-slate-700/15',
    bgGradientDark: 'from-amber-950/30 via-purple-950/50 to-slate-950/60',
    accentColor: 'text-amber-400',
  },
  96: {
    code: 96,
    label: 'Thunderstorm with Light Hail',
    description: 'Thunderstorm accompanied by small ice hail pellets.',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    bgGradientLight: 'from-purple-600/25 via-amber-500/20 to-slate-700/15',
    bgGradientDark: 'from-purple-950/60 via-amber-950/40 to-slate-950/60',
    accentColor: 'text-purple-400',
  },
  99: {
    code: 99,
    label: 'Severe Hail Thunderstorm',
    description: 'Severe storm with heavy lightning, squalls, and large hail.',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    bgGradientLight: 'from-purple-700/30 via-indigo-600/25 to-slate-800/20',
    bgGradientDark: 'from-purple-950/70 via-indigo-950/60 to-slate-950/70',
    accentColor: 'text-purple-300',
  },
};

export function getWeatherConditionInfo(code: number, isDay = 1): WeatherConditionInfo {
  const base = WMO_WEATHER_CODES[code] || {
    code,
    label: 'Variable Weather',
    description: 'Changing weather conditions.',
    iconName: isDay ? 'Sun' : 'Moon',
    category: 'clear' as const,
    bgGradientLight: 'from-sky-400/20 via-blue-300/15 to-indigo-400/10',
    bgGradientDark: 'from-sky-950/30 via-slate-900/40 to-indigo-950/30',
    accentColor: 'text-sky-400',
  };

  if (!isDay && (code === 0 || code === 1)) {
    return {
      ...base,
      label: code === 0 ? 'Clear Night' : 'Mostly Clear Night',
      iconName: 'MoonStar',
      accentColor: 'text-indigo-300',
      bgGradientLight: 'from-indigo-900/15 via-slate-800/15 to-blue-900/10',
      bgGradientDark: 'from-indigo-950/50 via-slate-950/60 to-blue-950/50',
    };
  }

  if (!isDay && code === 2) {
    return {
      ...base,
      label: 'Partly Cloudy Night',
      iconName: 'CloudMoon',
      accentColor: 'text-indigo-300',
    };
  }

  return base;
}

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function formatTemp(celsius: number, unit: 'C' | 'F'): string {
  if (unit === 'F') {
    return `${celsiusToFahrenheit(celsius)}°`;
  }
  return `${Math.round(celsius)}°`;
}

export function formatWindSpeed(speedKmh: number, unit: 'km/h' | 'mph' = 'km/h'): string {
  if (unit === 'mph') {
    return `${Math.round(speedKmh * 0.621371)} mph`;
  }
  return `${Math.round(speedKmh)} km/h`;
}

export function getWindDirectionLabel(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index] || 'N';
}

export function getUvCategory(uv: number): { label: string; color: string; level: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme' } {
  if (uv <= 2) return { label: 'Low', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', level: 'Low' };
  if (uv <= 5) return { label: 'Moderate', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20', level: 'Moderate' };
  if (uv <= 7) return { label: 'High', color: 'text-orange-500 bg-orange-500/10 border-orange-500/20', level: 'High' };
  if (uv <= 10) return { label: 'Very High', color: 'text-red-500 bg-red-500/10 border-red-500/20', level: 'Very High' };
  return { label: 'Extreme', color: 'text-purple-500 bg-purple-500/10 border-purple-500/20', level: 'Extreme' };
}
