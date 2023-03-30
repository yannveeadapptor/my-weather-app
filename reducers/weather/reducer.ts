import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WeatherData } from './types';
import { Locality } from '../location/reducer';

export type WeatherResponseSuccess = { type: 'success'; data: WeatherData };
export type WeatherResponseFailure = { type: 'failure'; error: string };
export type WeatherResponsePending = { type: 'pending' };
export type WeatherResponse = WeatherResponseSuccess | WeatherResponseFailure | WeatherResponsePending;

export interface WeatherState {
  weatherData: Record<string, WeatherResponse>;
}

export const DEFAULT_LOCATION_STATE: WeatherState = { weatherData: {} };

export const weatherSlice = createSlice({
 name: 'location',
  initialState: DEFAULT_LOCATION_STATE,
  reducers: {
    setWeatherDataPending: (state, action: PayloadAction<Locality>) => {
      state.weatherData[`${action.payload}`] = { type: 'pending' };
    },
    setWeatherDataSuccess: (state, action: PayloadAction<{ locality: Locality; weatherResponse: WeatherData }>) => {
  const { locality, weatherResponse } = action.payload;
      state.weatherData[`${locality}`] = { type: 'success', data: weatherResponse };
    },
 setWeatherDataFailure: (state, action: PayloadAction<{ locality: Locality; error: string }>) => {
  const { locality, error } = action.payload;
      state.weatherData[`${locality}`] = { type: 'failure', error };
    },
  },
});

export const weatherActions = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;