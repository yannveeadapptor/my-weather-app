import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LatLng } from 'react-native-maps';

 

export type Locality = LatLng;

export interface LocationDetails {
  locality: Locality;
}

export interface LocationState {
  myLocation?: LocationDetails;
}

export const DEFAULT_LOCATION_STATE: LocationState = {
};

export const locationSlice = createSlice({
 name: 'location',
  initialState: DEFAULT_LOCATION_STATE,
  reducers: {
    setMyLocation: (state, action: PayloadAction<Locality>) => {
      state.myLocation = {
        locality: action.payload,
      };
    },
  },
});

export const locationActions = locationSlice.actions;

export const locationReducer = locationSlice.reducer;