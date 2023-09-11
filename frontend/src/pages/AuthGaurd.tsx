import { GOOGLE_API_URL_CHECK } from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { oAuthApi } from "../redux/api/oAuth";
import { userApi } from "../redux/api/user";
import Home from ".";

const isSourceGoogle = (hash: string) => {
    return hash.includes(GOOGLE_API_URL_CHECK);
};

export enum AUTH_KEYS {
    DISCORD = "x-discord-auth",
    GOOGLE = "x-google-auth",
    ACCESS_TOKEN = "access_token",
    TURF_ACCESS_TOKEN = "turf_access_token",
    TURF_REFRESH_TOKEN = "refresh_token",
}
const AuthGaurd = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithRef<"div">
>(({ children, ...rest }, ref) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    React.useLayoutEffect(() => {
        setIsLoading(true);
        parseToken()
            .then(async (response) => {
                if (response.turf_access_token) {
                    dispatch(userApi.endpoints.getUser.initiate())
                        .unwrap()
                        .then(() => {
                            if (
                                window.location.pathname === "/signin" ||
                                window.location.pathname === "/register"
                            )
                                navigate("/", {
                                    replace: true,
                                });
                            else {
                                navigate(
                                    window.location.pathname +
                                        window.location.search,
                                    {
                                        replace: true,
                                    }
                                );
                            }
                        })
                        .catch(() => {
                            window.localStorage.removeItem(
                                AUTH_KEYS.TURF_ACCESS_TOKEN
                            );
                            window.localStorage.removeItem(
                                AUTH_KEYS.TURF_REFRESH_TOKEN
                            );
                        });
                    setIsLoading(false);
                    return;
                }
                if (response.source === null || response.token === null) {
                    setIsLoading(false);
                    if (window.location.pathname === "/register") {
                        navigate("/");
                    } else {
                        navigate(
                            window.location.pathname + window.location.search,
                            {
                                replace: true,
                            }
                        );
                    }
                    return;
                }
                dispatch(oAuthApi.endpoints.login.initiate())
                    .unwrap()
                    .then(() => {
                        setIsLoading(false);
                        navigate("/", {
                            replace: true,
                        });
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        if (err.status === 400) {
                            navigate("/register");
                            return;
                        }
                        navigate(
                            window.location.pathname + window.location.search,
                            {
                                replace: true,
                            }
                        );
                    });
            })
            .catch(() => {
                setIsLoading(false);
                navigate("/", {
                    replace: true,
                });
            });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    if (isLoading) return <Home />;
    return (
        <div ref={ref} {...rest}>
            {children}
        </div>
    );
});

export default AuthGaurd;

const parseToken = async () => {
    try {
        let access_token = null;
        if (window.location.hash) {
            access_token = window.location.hash
                .split("&")
                .filter((res) => res.includes(AUTH_KEYS.ACCESS_TOKEN))[0]
                .split("=")[1];
        }
        if (access_token) {
            window.localStorage.removeItem(
                !isSourceGoogle(window.location.hash)
                    ? AUTH_KEYS.DISCORD
                    : AUTH_KEYS.GOOGLE
            );
            window.localStorage.setItem(
                isSourceGoogle(window.location.hash)
                    ? AUTH_KEYS.GOOGLE
                    : AUTH_KEYS.DISCORD,
                access_token
            );
        }
        return {
            source: window.localStorage.getItem(AUTH_KEYS.DISCORD)
                ? AUTH_KEYS.DISCORD.split("-")[1]
                : window.localStorage.getItem(AUTH_KEYS.GOOGLE)
                ? AUTH_KEYS.GOOGLE.split("-")[1]
                : null,
            token:
                window.localStorage.getItem(AUTH_KEYS.DISCORD) ||
                window.localStorage.getItem(AUTH_KEYS.GOOGLE),
            turf_access_token: window.localStorage.getItem(
                AUTH_KEYS.TURF_ACCESS_TOKEN
            ),
        };
    } catch (error) {
        window.localStorage.clear();
        return {
            source: null,
            token: null,
            turf_access_token: null,
        };
    }
};
