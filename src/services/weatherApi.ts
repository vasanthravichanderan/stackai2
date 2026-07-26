import { GeoLocation, WeatherData } from '../types';

export const POPULAR_CITIES: GeoLocation[] = [
  {
    id: 2643743,
    name: 'London',
    latitude: 51.50853,
    longitude: -0.12574,
    country: 'United Kingdom',
    admin1: 'England',
    country_code: 'GB',
    timezone: 'Europe/London',
  },
  {
    id: 5128581,
    name: 'New York',
    latitude: 40.71427,
    longitude: -74.00597,
    country: 'United States',
    admin1: 'New York',
    country_code: 'US',
    timezone: 'America/New_York',
  },
  {
    id: 1850147,
    name: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.69171,
    country: 'Japan',
    admin1: 'Tokyo',
    country_code: 'JP',
    timezone: 'Asia/Tokyo',
  },
  {
    id: 2988507,
    name: 'Paris',
    latitude: 48.85341,
    longitude: 2.3488,
    country: 'France',
    admin1: 'Île-de-France',
    country_code: 'FR',
    timezone: 'Europe/Paris',
  },
  {
    id: 2147714,
    name: 'Sydney',
    latitude: -33.86785,
    longitude: 151.20732,
    country: 'Australia',
    admin1: 'New South Wales',
    country_code: 'AU',
    timezone: 'Australia/Sydney',
  },
  {
    id: 1880252,
    name: 'Singapore',
    latitude: 1.28967,
    longitude: 103.85007,
    country: 'Singapore',
    country_code: 'SG',
    timezone: 'Asia/Singapore',
  },
  {
    id: 5391959,
    name: 'San Francisco',
    latitude: 37.77493,
    longitude: -122.41942,
    country: 'United States',
    admin1: 'California',
    country_code: 'US',
    timezone: 'America/Los_Angeles',
  },
  {
    id: 292223,
    name: 'Dubai',
    latitude: 25.20485,
    longitude: 55.2708,
    country: 'United Arab Emirates',
    country_code: 'AE',
    timezone: 'Asia/Dubai',
  },
];

export async function searchCities(query: string): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      trimmed
    )}&count=10&language=en&format=json`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      elevation: item.elevation,
      country_code: item.country_code,
      country: item.country,
      admin1: item.admin1,
      admin2: item.admin2,
      timezone: item.timezone,
      population: item.population,
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    throw new Error('City not found or network error');
  }
}

export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  location: GeoLocation
): Promise<WeatherData> {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'precipitation',
        'rain',
        'showers',
        'snowfall',
        'weather_code',
        'cloud_cover',
        'pressure_msl',
        'surface_pressure',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m',
      ].join(','),
      hourly: [
        'temperature_2m',
        'relative_humidity_2m',
        'dew_point_2m',
        'apparent_temperature',
        'precipitation_probability',
        'precipitation',
        'rain',
        'showers',
        'snowfall',
        'weather_code',
        'pressure_msl',
        'cloud_cover',
        'visibility',
        'wind_speed_10m',
        'wind_direction_10m',
        'uv_index',
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'sunrise',
        'sunset',
        'uv_index_max',
        'precipitation_sum',
        'rain_sum',
        'showers_sum',
        'snowfall_sum',
        'precipitation_hours',
        'precipitation_probability_max',
        'wind_speed_10m_max',
        'wind_gusts_10m_max',
        'wind_direction_10m_dominant',
      ].join(','),
      timezone: location.timezone || 'auto',
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather data fetch failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.current || !data.daily) {
      throw new Error('City not found or network error');
    }

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      elevation: data.elevation,
      timezone: data.timezone,
      timezone_abbreviation: data.timezone_abbreviation,
      current: data.current,
      hourly: data.hourly,
      daily: data.daily,
      location,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('City not found or network error');
  }
}

export async function getLocationFromCoordinates(
  lat: number,
  lon: number
): Promise<GeoLocation> {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${lat.toFixed(
      2
    )},${lon.toFixed(2)}&count=1&language=en&format=json`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
    }
  } catch {
    // Ignore and fallback below
  }

  return {
    id: Date.now(),
    name: 'Your Location',
    latitude: lat,
    longitude: lon,
    country: 'Detected Location',
  };
}
