import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
 export interface GlobalLoaderState {
   show: boolean;
   message?: string;
   cancelMessage?: string;
 }
 
 export const DEFAULT_GLOBAL_LOADER_STATE: GlobalLoaderState = {
   show: false,
 };
 
 export const globalLoaderSlice = createSlice({
   name: 'globalLoader',
   initialState: DEFAULT_GLOBAL_LOADER_STATE,
   reducers: {
     show: (
       state,
       action: PayloadAction<{ message?: string; cancelMessage?: string } | undefined>
     ) => {
       state.show = true;
       state.message = action.payload?.message;
       state.cancelMessage = action.payload?.cancelMessage;
     },
     hide: (state) => {
       state.show = false;
       state.message = undefined;
       state.cancelMessage = undefined;
     },
   },
 });
 
 export const GlobalLoaderActions = globalLoaderSlice.actions;
 
 export const globalLoaderReducer = globalLoaderSlice.reducer;

 