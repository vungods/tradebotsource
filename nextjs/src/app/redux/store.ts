import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { combineReducers } from "redux";
import filterReducer from './features/filterSlice';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  storage,
  key: "my-app-state",
  whitelist: ["userReducer"],
};

const rootReducer = combineReducers({
  userReducer,
  filterReducer,
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
  devTools: true, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;