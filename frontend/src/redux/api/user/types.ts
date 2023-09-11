import { User } from "../oAuth/types";

export type LoginResponse = {
    token: string;
};

export type LoginRequest = {
    email: string;
    username: string;
};

export type UserSearchRequest = {
    query_value: string;
};
export type UserSearchResponse = {
    data: User[];
};
