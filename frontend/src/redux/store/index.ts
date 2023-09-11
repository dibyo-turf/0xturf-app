import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import auth from "../features/auth";
import { api } from "../api";
import { oAuthApi } from "../api/oAuth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [oAuthApi.reducerPath]: oAuthApi.reducer,
    auth: auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    })
      .concat(api.middleware)
      .concat(oAuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
