import AsyncStorage from '@react-native-async-storage/async-storage';
 import { combineReducers, configureStore } from '@reduxjs/toolkit';
 import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
 
 import { globalLoaderReducer } from './reducers/global-loader/reducer';
 
 const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
   whitelist: ['globalLoader'],
 };
 
 const rootReducer = combineReducers({
   globalLoader: globalLoaderReducer,
 });
 
 const persistedReducer = persistReducer(persistConfig, rootReducer);
 
 export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
       },
     }),
 });
 
 export const persistor = persistStore(store);
 
 // Infer the `RootState` and `AppDispatch` types from the store itself
 export type RootState = ReturnType<typeof store.getState>;
 
 export type AppDispatch = typeof store.dispatch;