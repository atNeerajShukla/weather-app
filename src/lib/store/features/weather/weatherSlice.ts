import { WeatherData } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WeatherState = {
    weatherData: WeatherData;
    showWeather: boolean;
    loading: boolean;
    searchInput: string;
    isFocused: boolean;
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
    loading: false,
    searchInput: "",
    isFocused: false,
};

export const weatherSlice = createSlice({
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
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setSearchInput: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload;
        },
        setIsFocused: (state, action: PayloadAction<boolean>) => {
            state.isFocused = action.payload;
        },
        clearSearchInput: (state) => {
            state.searchInput = "";
            state.showWeather = false;
        },
    },
});

export const {
    setWeatherData,
    updateWeatherData,
    setShowWeather,
    setLoading,
    setSearchInput,
    setIsFocused,
    clearSearchInput,
} = weatherSlice.actions;

export default weatherSlice.reducer;
