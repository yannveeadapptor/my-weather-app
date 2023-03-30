import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Locality } from '../location/reducer';
import { WeatherData } from './types';

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
 reducerPath: 'weather',
  baseQuery: fetchBaseQuery({
 baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getWeatherByLocality: builder.query<WeatherData, Locality>({
      query: (locality) => {
  return `weather?lat=${locality.latitude}&lon=${locality.longitude}&units=metric&appid=13512ed766d43b2287298257e6d3dfa1`;
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetWeatherByLocalityQuery
} = weatherApi;