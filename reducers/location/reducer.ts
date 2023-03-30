import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LatLng } from 'react-native-maps';

import { getDeviceLocation } from '../../apis/location';

export type Locality = LatLng;

export interface LocationDetails {
  locality: Locality;
}

export interface LocationState {
 myLocation: LocationDetails | undefined;
 error?: string;
}

export const DEFAULT_LOCATION_STATE: LocationState = {
 myLocation: undefined,
};

export const deviceLocation = createAsyncThunk('location/getDeviceLocation', async () => {
  const loc = await getDeviceLocation();

  return loc;
});

export const locationSlice = createSlice({
 name: 'location',
  initialState: DEFAULT_LOCATION_STATE,
  reducers: {},
  extraReducers: (builder) => {
  // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(deviceLocation.fulfilled, (state, action) => {
        state.myLocation = {
          locality: {
            latitude: action.payload.coords.latitude,
            longitude: action.payload.coords.longitude,
          },
        };
 state.error = undefined;
      })
      .addCase(deviceLocation.pending, (state, action) => {
 state.myLocation = undefined;
 state.error = undefined;
      })
      .addCase(deviceLocation.rejected, (state, action) => {
 state.myLocation = undefined;
 state.error = undefined;
      });
  },
});

export const locationActions = locationSlice.actions;

export const locationReducer = locationSlice.reducer;