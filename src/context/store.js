import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { reTariff } from "./tariff";
import { reRegistration } from "./registration";
import { reAlgorithm } from "./algorithm";
import { loading } from "./loading";
import { authApi } from "./services/auth.service";
import { apiSlice } from "./services/api.service";

export const store = configureStore({
  reducer: combineReducers({
    tariff: reTariff,
    registration: reRegistration,
    algorithm: reAlgorithm,
    loading,
    [authApi.reducerPath]: authApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
