import { API_URL } from "../../config";
import { AUTH_KEYS } from "../../pages/AuthGaurd";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { LoginResponse } from "./oAuth/types";

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async (headers) => {
    const token = await window.localStorage.getItem(
      AUTH_KEYS.TURF_ACCESS_TOKEN
    );
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const token = window.localStorage.getItem(AUTH_KEYS.TURF_ACCESS_TOKEN);
        const refresh_token = window.localStorage.getItem(
          AUTH_KEYS.TURF_REFRESH_TOKEN
        );
        if (!token && !refresh_token) {
          return (result = await baseQuery(args, api, extraOptions));
        }
        const refreshResult = await baseQuery(
          {
            url: "/user/token/refresh",
            method: "POST",
            body: {
              refresh_token: refresh_token,
            },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          window.localStorage.setItem(
            AUTH_KEYS.TURF_ACCESS_TOKEN,
            (refreshResult.data as LoginResponse).auth_token
          );
          window.localStorage.setItem(
            AUTH_KEYS.TURF_REFRESH_TOKEN,
            (refreshResult.data as LoginResponse).refresh_token
          );
        } else {
          window.localStorage.removeItem(AUTH_KEYS.TURF_ACCESS_TOKEN);
          window.localStorage.removeItem(AUTH_KEYS.TURF_REFRESH_TOKEN);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;
