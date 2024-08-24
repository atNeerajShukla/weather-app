interface WeatherData {
    area_name: string;
    humidity: number;
    rain_accumulation: number;
    rain_intensity: number;
    temperature: number;
    wind_direction: number;
    wind_speed: number;
}

interface LocalityData {
    cityName: string;
    localityName: string;
    localityId: string;
}

export type { WeatherData, LocalityData };