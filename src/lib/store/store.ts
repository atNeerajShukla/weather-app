import { configureStore } from '@reduxjs/toolkit'
import weatherDataReducer from './features/weather/weatherDataSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      weatherData: weatherDataReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']