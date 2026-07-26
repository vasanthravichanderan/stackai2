export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country?: string;
  admin1?: string; // State or region
  admin2?: string;
  admin3?: string;
  timezone?: string;
  population?: number;
}

export type TempUnit = 'C' | 'F';

export interface CurrentWeather {
  time: string;
  temperature: number;
  relative_humidity: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  dew_point_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  rain: number[];
  showers: number[];
  snowfall: number[];
  weather_code: number[];
  pressure_msl: number[];
  cloud_cover: number[];
  visibility: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  uv_index: number[];
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezone_abbreviation: string;
  current: CurrentWeather;
  hourly: HourlyForecast;
  daily: DailyForecast;
  location: GeoLocation;
}

export interface WeatherConditionInfo {
  code: number;
  label: string;
  description: string;
  iconName: string; // Used to pick Lucide icon dynamically
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  bgGradientLight: string;
  bgGradientDark: string;
  accentColor: string;
}

export interface PlanningInsight {
  id: string;
  category: 'clothing' | 'umbrella' | 'activities' | 'uv' | 'wind' | 'overall';
  title: string;
  summary: string;
  details: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  icon: string;
}

export interface OutdoorActivity {
  id: string;
  name: string;
  icon: string;
  score: number; // 0 to 100
  label: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  color: string;
  tip: string;
}
