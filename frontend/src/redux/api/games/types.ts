import { User } from "../oAuth/types";

export type SearchGamesRequest = {
    query_value: string;
};
export type Game = {
    id: string;
    banner: string;
    name: string;
};
export type SearchUsersRequest = {
    query_value: string;
};
export type SearchUsersResponse = {
    suggestionTurfID: string[];
    status: boolean;
    user: string;
};
export type SearchGamesResponse = Game[];
export type LeaderboardGamesResponse = User[];

export type addGamePreference = {
    game_name: string;
    game_parent_name: string;
};
export type AddGamesRequest = {
    game_id: string;
    region: string;
    server: string;
    username: string;
    player_tag: string;
};
