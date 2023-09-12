export const BASE_URL = import.meta.env.VITE_BASE_URL;

const GOOGLE_CALLBACK_URL = import.meta.env.PROD
    ? `${BASE_URL}/loading`
    : `${BASE_URL}/loading`;

export const PRODUCTION_DISCORD_URL =
    "https://discord.com/api/oauth2/authorize?client_id=1122881933274263683&redirect_uri=https%3A%2F%2F0xturf-app.vercel.app%2Floading&response_type=code&scope=identify%20email";
export const LOCAL_DISCORD_URL =
    "https://discord.com/api/oauth2/authorize?client_id=1122881933274263683&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Floading&response_type=token&scope=identify%20email";
export const IN_APP_PRODUCTION_DISCORD_URL =
    "https://discord.com/api/oauth2/authorize?client_id=1149027517060087810&redirect_uri=https%3A%2F%2Fturf-app.vercel.app%2Fprofile&response_type=code&scope=identify%20email";
export const IN_APP_LOCAL_DISCORD_LINK =
    "https://discord.com/api/oauth2/authorize?client_id=1149027517060087810&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile&response_type=code&scope=identify%20email";
export const DISCORD_URL = import.meta.env.PROD
    ? PRODUCTION_DISCORD_URL
    : LOCAL_DISCORD_URL;
export const IN_APP_DISCORD_URL = import.meta.env.PROD
    ? IN_APP_PRODUCTION_DISCORD_URL
    : IN_APP_LOCAL_DISCORD_LINK;
export const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=token&redirect_uri=${encodeURIComponent(
    GOOGLE_CALLBACK_URL
)}&scope=profile%20email&client_id=869064148873-5594tcbsv362kjc3jduks8mq2bemfdmm.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow`;

export const API_URL = "https://13c4-128-106-146-87.ngrok-free.app";

export const GOOGLE_API_URL_CHECK = "https://www.googleapis.com";
