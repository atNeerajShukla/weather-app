import { WeatherData } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WeatherState = {
    weatherData: WeatherData;
    showWeather: boolean;
}

const initialState: WeatherState = {
    weatherData: {
        area_name: "--",
        humidity: 0,
        rain_accumulation: 0,
        rain_intensity: 0,
        temperature: 0,
        wind_direction: 0,
        wind_speed: 0,
    },
    showWeather: false,
};

export const weatherDataSlice = createSlice({
    name: 'weatherData',
    initialState,
    reducers: {
        setWeatherData: (state, action: PayloadAction<WeatherData>) => {
            state.weatherData = action.payload;
        },
        updateWeatherData: (state, action: PayloadAction<Partial<WeatherData>>) => {
            state.weatherData = { ...state.weatherData, ...action.payload };
        },
        setShowWeather: (state, action: PayloadAction<boolean>) => {
            state.showWeather = action.payload;
        },
    },
});

export const { setWeatherData, updateWeatherData, setShowWeather } = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
