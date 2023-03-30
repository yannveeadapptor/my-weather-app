import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LatLng } from 'react-native-maps';

import { WeatherData } from './types';
import { fetchWeather } from '../../apis/weather';

export type WeatherResponseSuccess = { type: 'success'; data: WeatherData };
export type WeatherResponseFailure = { type: 'failure'; error: string };
export type WeatherResponsePending = { type: 'pending' };
export type WeatherResponse = WeatherResponseSuccess | WeatherResponseFailure | WeatherResponsePending;

export interface WeatherState {
  weatherData: Record<string, WeatherResponse>;
}

export const DEFAULT_LOCATION_STATE: WeatherState = { weatherData: {} };

export const lookUpWeather = createAsyncThunk(
  'weather/lookUpWeather',
  async (latLong: LatLng): Promise<WeatherData> => {
  try {
  return fetchWeather(latLong);
 } catch (e: unknown) {
  throw new Error(`${e}`);
    }
  },
);

export const weatherSlice = createSlice({
 name: 'location',
  initialState: DEFAULT_LOCATION_STATE,
  reducers: {},
  extraReducers: (builder) => {
  // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(lookUpWeather.fulfilled, (state, action) => {
  const weatherData = action.payload;
        state.weatherData[`${action.meta.arg}`] = { type: 'success', data: weatherData };
      })
      .addCase(lookUpWeather.pending, (state, action) => {
        state.weatherData[`${action.meta.arg}`] = { type: 'pending' };
      })
      .addCase(lookUpWeather.rejected, (state, action) => {
  const { message } = action.error;

        state.weatherData[`${action.meta.arg}`] = { type: 'failure', error: message ?? 'Unknown error' };
      });
  },
});

export const weatherActions = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;