import { userApiwithTags } from "..";
import { LoginResponse } from "../oAuth/types";
import { GlobalSearchResponse } from "../search/types";
import { UserSearchRequest, UserSearchResponse } from "./types";

export const userApi = userApiwithTags.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<LoginResponse, void>({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            transformResponse: (response: { data: LoginResponse }) =>
                response.data,
            providesTags: [`User`],
        }),
        updateUser: builder.mutation<
            {
                status: boolean;
            },
            FormData
        >({
            query: (data) => ({
                url: "/user/profile",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: {
                error: {
                    status: boolean;
                };
            }) => response.error,
            invalidatesTags: [`User`, "Portfolio"],
        }),
        searchUser: builder.query<GlobalSearchResponse, UserSearchRequest>({
            query: ({ query_value }) => ({
                url: "/user/search?query_value=" + query_value,
                method: "GET",
            }),
            transformResponse: (response: {
                data: { data: UserSearchResponse["data"] };
            }) => {
                return response.data.data.map((user) => {
                    return {
                        name: user.turf_id,
                        imgUrl: user.image,
                    };
                });
            },
        }),
    }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
