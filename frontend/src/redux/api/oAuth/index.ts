import { LoginResponse } from "./types";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../config";
import { AUTH_KEYS } from "../../../pages/AuthGaurd";

export const oAuthApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const source = window.localStorage.getItem(AUTH_KEYS.DISCORD)
                ? AUTH_KEYS.DISCORD.split("-")[1]
                : window.localStorage.getItem(AUTH_KEYS.GOOGLE)
                ? AUTH_KEYS.GOOGLE.split("-")[1]
                : null;
            const token =
                window.localStorage.getItem(AUTH_KEYS.DISCORD) ||
                window.localStorage.getItem(AUTH_KEYS.GOOGLE);
            if (token && source) {
                headers.set("Authorization", `Bearer ${token}`);
                headers.set("source", source);
            }
            return headers;
        },
    }),

    reducerPath: "oAuth",
    endpoints: (builder) => ({
        login: builder.query<LoginResponse, void>({
            query: () => ({
                url: "account/login",
                method: "POST",
            }),
            transformResponse: (response: { data: LoginResponse }) => {
                return response.data;
            },
            transformErrorResponse: (error) => {
                return {
                    ...error,
                    status: error.status,
                };
            },
        }),
        register: builder.mutation<
            LoginResponse,
            {
                turfId: string;
                image: string;
                game_preferences: string[];
            }
        >({
            query: (data) => ({
                url: "account/register",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: {
                data: {
                    user: LoginResponse;
                };
            }) => {
                return response.data.user;
            },
            transformErrorResponse: (error) => {
                return {
                    ...error,
                    status: error.status,
                };
            },
        }),
    }),
});

export const { useLoginQuery, useRegisterMutation } = oAuthApi;
