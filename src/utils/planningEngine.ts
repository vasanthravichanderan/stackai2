import { OutdoorActivity, PlanningInsight, WeatherData } from '../types';

export function generatePlanningInsights(weather: WeatherData): PlanningInsight[] {
  const current = weather.current;
  const daily = weather.daily;
  const hourly = weather.hourly;

  const insights: PlanningInsight[] = [];

  // 1. Umbrella & Rain Alert
  const todayRainProb = daily.precipitation_probability_max?.[0] ?? 0;
  const todayRainSum = daily.precipitation_sum?.[0] ?? 0;

  // Check next 6 hours precipitation probability
  const nextHoursProb = hourly.precipitation_probability?.slice(0, 8) || [];
  const maxNextHoursProb = nextHoursProb.length > 0 ? Math.max(...nextHoursProb) : todayRainProb;

  if (maxNextHoursProb >= 70 || todayRainSum >= 5) {
    insights.push({
      id: 'rain-alert-high',
      category: 'umbrella',
      title: 'Rain Gear Essential Today',
      summary: `High precipitation risk (${maxNextHoursProb}% chance). Heavy rainfall expected.`,
      details: 'Pack a sturdy umbrella, waterproof jacket, and water-resistant footwear before stepping out.',
      type: 'alert',
      icon: 'Umbrella',
    });
  } else if (maxNextHoursProb >= 35 || todayRainSum > 0.5) {
    insights.push({
      id: 'rain-alert-mod',
      category: 'umbrella',
      title: 'Keep an Umbrella Handy',
      summary: `Scatter showers possible today (${maxNextHoursProb}% chance).`,
      details: 'Light rain or passing showers are expected. A compact umbrella or light raincoat is recommended.',
      type: 'warning',
      icon: 'CloudRain',
    });
  } else {
    insights.push({
      id: 'rain-clear',
      category: 'umbrella',
      title: 'No Umbrella Required',
      summary: 'Dry conditions forecast with minimal rain chance.',
      details: 'You can leave the umbrella behind today. Great weather for outdoor plans without damp gear!',
      type: 'success',
      icon: 'Sun',
    });
  }

  // 2. Clothing & Layers Guidance
  const feel = current.apparent_temperature;
  const isWindy = current.wind_speed_10m > 25;

  if (feel <= 0) {
    insights.push({
      id: 'clothing-freezing',
      category: 'clothing',
      title: 'Freezing Weather Wardrobe',
      summary: `Feels like ${Math.round(feel)}°C. Heavy winter protection needed.`,
      details: 'Wear a thick thermal base layer, insulated down jacket, winter gloves, wool beanie, and scarf.',
      type: 'alert',
      icon: 'Shirt',
    });
  } else if (feel > 0 && feel <= 10) {
    insights.push({
      id: 'clothing-cold',
      category: 'clothing',
      title: 'Warm Layers & Winter Coat',
      summary: `Crisp chilly weather (Feels like ${Math.round(feel)}°C).`,
      details: 'Pair a fleece sweater or heavy hoodie with a warm coat, long pants, and warm socks.',
      type: 'warning',
      icon: 'Shirt',
    });
  } else if (feel > 10 && feel <= 17) {
    insights.push({
      id: 'clothing-chilly',
      category: 'clothing',
      title: 'Light Outerwear Recommended',
      summary: `Cool & mild temperatures (Feels like ${Math.round(feel)}°C).`,
      details: isWindy
        ? 'A windproof jacket or fleece sweater with jeans will keep you comfortable.'
        : 'A light sweater, denim jacket, or hoodie over a shirt will be ideal.',
      type: 'info',
      icon: 'Shirt',
    });
  } else if (feel > 17 && feel <= 24) {
    insights.push({
      id: 'clothing-pleasant',
      category: 'clothing',
      title: 'Comfortable Everyday Wear',
      summary: `Ideal temperature range (Feels like ${Math.round(feel)}°C).`,
      details: 'Wear cotton t-shirts, casual trousers, or chinos. Carry a thin cardigan for cooler evenings.',
      type: 'success',
      icon: 'Shirt',
    });
  } else {
    insights.push({
      id: 'clothing-hot',
      category: 'clothing',
      title: 'Lightweight & Breathable Clothing',
      summary: `Warm/Hot conditions (Feels like ${Math.round(feel)}°C).`,
      details: 'Opt for loose-fitting cotton or moisture-wicking fabrics, shorts/skirt, and breathable footwear.',
      type: 'info',
      icon: 'Shirt',
    });
  }

  // 3. Sun & UV Protection
  const maxUv = daily.uv_index_max?.[0] ?? 0;
  if (maxUv >= 8) {
    insights.push({
      id: 'uv-extreme',
      category: 'uv',
      title: 'Extreme UV Radiation Warning',
      summary: `Peak UV Index reaches ${maxUv.toFixed(1)}. High risk of sunburn.`,
      details: 'Apply broad-spectrum SPF 50+ sunscreen every 2 hours. Wear UV-blocking sunglasses, wide brim hat, and seek shade between 10 AM - 4 PM.',
      type: 'alert',
      icon: 'SunDim',
    });
  } else if (maxUv >= 5) {
    insights.push({
      id: 'uv-high',
      category: 'uv',
      title: 'Moderate to High UV Index',
      summary: `Peak UV Index reaches ${maxUv.toFixed(1)}.`,
      details: 'Apply SPF 30+ sunscreen if staying outdoors over 20 minutes, wear UV sunglasses, and stay hydrated.',
      type: 'warning',
      icon: 'Sun',
    });
  } else {
    insights.push({
      id: 'uv-low',
      category: 'uv',
      title: 'Low Sun Radiation',
      summary: `Maximum UV Index is ${maxUv.toFixed(1)}.`,
      details: 'Low sunburn hazard. Routine sun care is sufficient for quick outdoor trips.',
      type: 'success',
      icon: 'Sun',
    });
  }

  // 4. Wind & Gust Advisor
  const windSpeed = current.wind_speed_10m;
  const gusts = current.wind_gusts_10m;
  if (windSpeed > 35 || gusts > 50) {
    insights.push({
      id: 'wind-gale',
      category: 'wind',
      title: 'Breezy & Gusty Winds',
      summary: `Wind speeds around ${Math.round(windSpeed)} km/h with gusts up to ${Math.round(gusts)} km/h.`,
      details: 'Take care with loose outdoor patio furniture, umbrellas, and high-profile vehicles.',
      type: 'warning',
      icon: 'Wind',
    });
  }

  return insights;
}

export function calculateOutdoorActivities(weather: WeatherData): OutdoorActivity[] {
  const current = weather.current;
  const daily = weather.daily;

  const temp = current.temperature;
  const rainProb = daily.precipitation_probability_max?.[0] ?? 0;
  const rainSum = daily.precipitation_sum?.[0] ?? 0;
  const wind = current.wind_speed_10m;
  const cloud = current.cloud_cover;
  const isDay = current.is_day;
  const uv = daily.uv_index_max?.[0] ?? 0;

  // 1. Running / Jogging
  let runningScore = 100;
  if (temp < 5) runningScore -= (5 - temp) * 5;
  else if (temp > 22) runningScore -= (temp - 22) * 6;
  if (temp >= 10 && temp <= 18) runningScore += 10; // optimal
  if (rainProb > 40) runningScore -= 30;
  if (rainSum > 2) runningScore -= 25;
  if (wind > 25) runningScore -= 20;

  runningScore = Math.max(0, Math.min(100, runningScore));

  // 2. Cycling / Biking
  let cyclingScore = 100;
  if (temp < 8) cyclingScore -= (8 - temp) * 6;
  else if (temp > 28) cyclingScore -= (temp - 28) * 5;
  if (wind > 15) cyclingScore -= (wind - 15) * 2.5;
  if (rainProb > 30) cyclingScore -= 35;
  if (rainSum > 1) cyclingScore -= 30;

  cyclingScore = Math.max(0, Math.min(100, cyclingScore));

  // 3. Outdoor Dining & Picnic
  let picnicScore = 100;
  if (temp < 16) picnicScore -= (16 - temp) * 7;
  else if (temp > 29) picnicScore -= (temp - 29) * 6;
  if (rainProb > 25) picnicScore -= 40;
  if (cloud > 75) picnicScore -= 20;
  if (wind > 20) picnicScore -= 25;

  picnicScore = Math.max(0, Math.min(100, picnicScore));

  // 4. Stargazing
  let starScore = 100;
  if (isDay === 1) {
    starScore = 20; // Low during daylight
  } else {
    if (cloud > 20) starScore -= (cloud - 20) * 0.9;
    if (rainProb > 20) starScore -= 40;
    if (temp < -5) starScore -= 20;
  }
  starScore = Math.max(0, Math.min(100, starScore));

  // 5. Beach & Sunbathing
  let beachScore = 100;
  if (isDay === 0) {
    beachScore = 10;
  } else {
    if (temp < 22) beachScore -= (22 - temp) * 8;
    if (cloud > 40) beachScore -= (cloud - 40) * 0.8;
    if (rainProb > 20) beachScore -= 40;
    if (uv < 3) beachScore -= 20;
  }
  beachScore = Math.max(0, Math.min(100, beachScore));

  const getRating = (score: number): { label: 'Excellent' | 'Good' | 'Fair' | 'Poor'; color: string } => {
    if (score >= 80) return { label: 'Excellent', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
    if (score >= 60) return { label: 'Good', color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' };
    if (score >= 40) return { label: 'Fair', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
    return { label: 'Poor', color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' };
  };

  const runRating = getRating(runningScore);
  const cycleRating = getRating(cyclingScore);
  const picnicRating = getRating(picnicScore);
  const starRating = getRating(starScore);
  const beachRating = getRating(beachScore);

  return [
    {
      id: 'running',
      name: 'Running / Jogging',
      icon: 'Footprints',
      score: Math.round(runningScore),
      label: runRating.label,
      color: runRating.color,
      tip:
        runningScore >= 75
          ? 'Great outdoor running conditions!'
          : runningScore >= 50
          ? 'Decent conditions. Watch wind & temperature.'
          : 'Suboptimal. Indoor treadmill may be better.',
    },
    {
      id: 'cycling',
      name: 'Road Cycling',
      icon: 'Bike',
      score: Math.round(cyclingScore),
      label: cycleRating.label,
      color: cycleRating.color,
      tip:
        cyclingScore >= 75
          ? 'Smooth roads & calm wind ahead.'
          : cyclingScore >= 50
          ? 'Watch out for breezy gusts or light dampness.'
          : 'Wet or gusty weather. Exercise caution.',
    },
    {
      id: 'picnic',
      name: 'Outdoor Dining & Picnic',
      icon: 'UtensilsCrossed',
      score: Math.round(picnicScore),
      label: picnicRating.label,
      color: picnicRating.color,
      tip:
        picnicScore >= 75
          ? 'Pleasant temperatures and calm sky.'
          : picnicScore >= 50
          ? 'Acceptable weather; carry a jacket.'
          : 'High chance of rain or uncomfortable wind.',
    },
    {
      id: 'stargazing',
      name: 'Night Stargazing',
      icon: 'Sparkles',
      score: Math.round(starScore),
      label: starRating.label,
      color: starRating.color,
      tip:
        isDay === 1
          ? 'Best enjoyed at night when clouds clear.'
          : starScore >= 70
          ? 'Clear night sky! Great visibility.'
          : 'Cloud cover or haze may obscure stars.',
    },
    {
      id: 'beach',
      name: 'Beach & Swimming',
      icon: 'Waves',
      score: Math.round(beachScore),
      label: beachRating.label,
      color: beachRating.color,
      tip:
        beachScore >= 70
          ? 'Warm sun & ideal for outdoor swimming!'
          : beachScore >= 45
          ? 'Mild temperatures; warm clothes needed after swimming.'
          : 'Too cool, cloudy, or wet for beach outings.',
    },
  ];
}
