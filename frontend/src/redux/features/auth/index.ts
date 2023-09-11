import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_KEYS } from "../../../pages/AuthGaurd";
import { oAuthApi } from "../../api/oAuth";
import { LoginResponse, User } from "../../api/oAuth/types";
import { userApi } from "../../api/user";

export const removeoAuthTokens = () => {
    if (window.localStorage.getItem(AUTH_KEYS.DISCORD)) {
        window.localStorage.removeItem(AUTH_KEYS.DISCORD);
    }
    if (window.localStorage.getItem(AUTH_KEYS.GOOGLE)) {
        window.localStorage.removeItem(AUTH_KEYS.GOOGLE);
    }
};
export const removeAccessTokens = () => {
    if (window.localStorage.getItem(AUTH_KEYS.TURF_ACCESS_TOKEN)) {
        window.localStorage.removeItem(AUTH_KEYS.TURF_ACCESS_TOKEN);
    }
    if (window.localStorage.getItem(AUTH_KEYS.TURF_REFRESH_TOKEN)) {
        window.localStorage.removeItem(AUTH_KEYS.TURF_REFRESH_TOKEN);
    }
};
interface Auth {
    status: "none" | "registered" | "unregistered";
    user: User | null;
    accessToken: string | null;
}

export const initialState: Auth = {
    status: "none",
    user: null,
    accessToken: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setInitialState: () => {
            return {
                status: initialState.status,
                accessToken: initialState.accessToken,
                user: initialState.user,
            };
        },
        setAuthToken: (
            state,
            action: PayloadAction<Pick<Auth, "accessToken">>
        ) => {
            return {
                ...state,
                accessToken: action.payload.accessToken,
            };
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(
                oAuthApi.endpoints.login.matchFulfilled,
                (state, action: PayloadAction<LoginResponse>) => {
                    if (
                        action.payload.auth_token &&
                        action.payload.refresh_token
                    ) {
                        window.localStorage.setItem(
                            AUTH_KEYS.TURF_ACCESS_TOKEN,
                            action.payload.auth_token
                        );
                        window.localStorage.setItem(
                            AUTH_KEYS.TURF_REFRESH_TOKEN,
                            action.payload.refresh_token
                        );
                    }
                    return {
                        accessToken: action.payload.auth_token,
                        user: action.payload,
                        status: "registered",
                    };
                }
            )
            .addMatcher(
                oAuthApi.endpoints.login.matchRejected,
                (state, action) => {
                    if (action.payload?.status === 401) {
                        removeoAuthTokens();
                    }
                    return { ...state, status: "unregistered" };
                }
            )
            .addMatcher(
                oAuthApi.endpoints.register.matchFulfilled,
                (state, action: PayloadAction<LoginResponse>) => {
                    removeoAuthTokens();
                    if (
                        action.payload.auth_token &&
                        action.payload.refresh_token
                    ) {
                        window.localStorage.setItem(
                            AUTH_KEYS.TURF_ACCESS_TOKEN,
                            action.payload.auth_token
                        );
                        window.localStorage.setItem(
                            AUTH_KEYS.TURF_REFRESH_TOKEN,
                            action.payload.refresh_token
                        );
                    }
                    return {
                        accessToken: action.payload.auth_token,
                        user: action.payload,
                        status: "registered",
                    };
                }
            )
            .addMatcher(
                userApi.endpoints.getUser.matchFulfilled,
                (state, action: PayloadAction<LoginResponse>) => {
                    return {
                        accessToken: action.payload.auth_token,
                        user: action.payload,
                        status: "registered",
                    };
                }
            );
    },
});

export const { setAuthToken, setInitialState } = authSlice.actions;

export default authSlice.reducer;
