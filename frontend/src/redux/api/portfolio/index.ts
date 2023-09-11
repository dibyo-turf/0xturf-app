import { api, portfolioApiWithTags } from "..";
import { LoginResponse } from "../oAuth/types";
import { PortfolioData, PortfolioDataRequest } from "./types";

export const portfolioApi = portfolioApiWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getPortfolioData: builder.query<
            PortfolioData["data"]["user"],
            PortfolioDataRequest
        >({
            query: ({ turf_id, user_uid }) => ({
                url: user_uid
                    ? `/games/portfolio?turf_id=${turf_id}&user_uid=${user_uid}`
                    : `/games/portfolio?turf_id=${turf_id}`,
                method: "GET",
            }),
            transformResponse: (response: PortfolioData) => {
                const badges = response.data.user.badges.map((ds) => {
                    return {
                        id: ds.id,
                        name: ds.name as string,
                    };
                });
                return { ...response.data.user, badges: badges };
            },
            providesTags: ["Portfolio"],
        }),
        followUser: builder.mutation<
            LoginResponse,
            {
                user_uid: string;
                follow: boolean;
            }
        >({
            query: (data) => ({
                url: "/user/reaction",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: { data: LoginResponse }) =>
                response.data,
            invalidatesTags: ["Portfolio"],
        }),
    }),
});
export const { useGetPortfolioDataQuery, useFollowUserMutation } = portfolioApi;
