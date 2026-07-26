import React from 'react';
import {
  Sun,
  SunDim,
  Moon,
  MoonStar,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSunRain,
  CloudHail,
  CloudLightning,
  Snowflake,
  Wind,
  Umbrella,
  Shirt,
  Footprints,
  Bike,
  UtensilsCrossed,
  Sparkles,
  Waves,
  Eye,
  Thermometer,
  Droplets,
  Sunrise,
  Sunset,
  Gauge,
  HelpCircle,
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Sun':
      return <Sun className={className} />;
    case 'SunDim':
      return <SunDim className={className} />;
    case 'Moon':
      return <Moon className={className} />;
    case 'MoonStar':
      return <MoonStar className={className} />;
    case 'CloudSun':
      return <CloudSun className={className} />;
    case 'CloudMoon':
      return <CloudMoon className={className} />;
    case 'Cloud':
      return <Cloud className={className} />;
    case 'CloudFog':
      return <CloudFog className={className} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={className} />;
    case 'CloudRain':
      return <CloudRain className={className} />;
    case 'CloudRainWind':
      return <CloudRainWind className={className} />;
    case 'CloudSunRain':
      return <CloudSunRain className={className} />;
    case 'CloudHail':
      return <CloudHail className={className} />;
    case 'CloudLightning':
      return <CloudLightning className={className} />;
    case 'Snowflake':
      return <Snowflake className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Umbrella':
      return <Umbrella className={className} />;
    case 'Shirt':
      return <Shirt className={className} />;
    case 'Footprints':
      return <Footprints className={className} />;
    case 'Bike':
      return <Bike className={className} />;
    case 'UtensilsCrossed':
      return <UtensilsCrossed className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Waves':
      return <Waves className={className} />;
    case 'Eye':
      return <Eye className={className} />;
    case 'Thermometer':
      return <Thermometer className={className} />;
    case 'Droplets':
      return <Droplets className={className} />;
    case 'Sunrise':
      return <Sunrise className={className} />;
    case 'Sunset':
      return <Sunset className={className} />;
    case 'Gauge':
      return <Gauge className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};
