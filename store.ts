import { configureStore } from '@reduxjs/toolkit';
import { globalLoaderReducer } from './reducers/global-loader/reducer';
 

export const store = configureStore({
    reducer: {
      globalLoader: globalLoaderReducer,
    },
  });
 
 // Infer the `RootState` and `AppDispatch` types from the store itself
 export type RootState = ReturnType<typeof store.getState>;
 
 export type AppDispatch = typeof store.dispatch;
