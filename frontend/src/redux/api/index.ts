import { createApi, retry } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customBaseQuery";

const baseQuery = customFetchBase;

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
    reducerPath: "turf",
    baseQuery: baseQueryWithRetry,
    endpoints: () => ({}),
});

export const userApiwithTags = api.enhanceEndpoints({
    addTagTypes: ["User", "Portfolio"],
});

export const portfolioApiWithTags = api.enhanceEndpoints({
    addTagTypes: ["Portfolio"],
});
