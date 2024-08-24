"use client"

import SearchComponent from "@/components/searchComponent";
import WeatherComponent from "@/components/weatherComponent";
import { WeatherData } from "@/interfaces";
import { useState } from "react";

export default function Home() {

  const [showWeather, setShowWeather] = useState(false);

  const [weatherData, setWeatherData] = useState<WeatherData>({
    area_name: "--",
    humidity: 0,
    rain_accumulation: 0,
    rain_intensity: 0,
    temperature: 0,
    wind_direction: 0,
    wind_speed: 0
  });


  return (
    <main>
      <div className="grid md:grid-cols-2 min-h-screen">
        <SearchComponent setWeatherData={setWeatherData} setShowWeather={setShowWeather} />
        <WeatherComponent weatherData={weatherData} showWeather={showWeather} />
      </div>
    </main>
  );
}
