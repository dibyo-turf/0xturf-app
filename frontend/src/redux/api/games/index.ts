import { api } from "..";
import {
    AddGamesRequest,
    LeaderboardGamesResponse,
    SearchGamesRequest,
    SearchGamesResponse,
    SearchUsersRequest,
    SearchUsersResponse,
    addGamePreference,
} from "./types";

export const gamesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        searchGames: builder.query<SearchGamesResponse, SearchGamesRequest>({
            query: ({ query_value }) => ({
                url: `/games/search?query_value=${query_value}`,
                method: "GET",
            }),
            transformResponse: (response: { data: SearchGamesResponse }) => {
                return response.data;
            },
        }),
        searchUsers: builder.query<SearchUsersResponse, SearchUsersRequest>({
            query: ({ query_value }) => ({
                url: `/user/verify?turfId=${query_value}`,
            }),
            transformResponse: (response: { data: SearchUsersResponse }) => {
                return response.data;
            },
        }),
        addGames: builder.mutation<SearchUsersResponse, AddGamesRequest>({
            query: (data) => ({
                url: `/riot/lol`,
                method: "POST",
                body: data,
            }),
            transformResponse: (response: { data: SearchUsersResponse }) => {
                return response.data;
            },
        }),
        getLeaderBoardGames: builder.query<LeaderboardGamesResponse, void>({
            query: () => ({
                url: `/games/leaderboard`,
                method: "GET",
            }),
            transformResponse: (response: {
                data: LeaderboardGamesResponse;
            }) => {
                return response.data.map((item, index) => {
                    const badges = item.badges.map((ds) => {
                        return {
                            id: ds.id,
                            name: ds.name,
                        };
                    });
                    return {
                        ...item,
                        rank_id: index,
                        badges: badges,
                    };
                });
            },
        }),
        addGameData: builder.query<SearchGamesResponse, addGamePreference>({
            query: ({ game_name, game_parent_name }) => ({
                url: `/${game_parent_name.toLocaleLowerCase()}/${game_name.toLocaleLowerCase()}`,
                method: "POST",
            }),
            transformResponse: (response: { data: SearchGamesResponse }) => {
                return response.data;
            },
        }),
    }),
});
export const {
    useSearchGamesQuery,
    useGetLeaderBoardGamesQuery,
    useAddGamesMutation,
} = gamesApi;
