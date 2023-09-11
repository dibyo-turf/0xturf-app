export type User = {
    uid: string;
    turf_id: string;
    rank_id: number;
    user_desc: string;
    image: string;
    claims_id: string;
    turf_xp: 3;
    is_active: boolean;
    referral_code: string;
    banner: string;
    followings_count: number;
    followers_count: number;
    last_login_at: string;
    refresh_token: string;
    communities: Community[];
    discord: string;
    games: [];
    connected_games: Connected_Game[];
    has_followed?: boolean;
    badges: Badge[];
    game_pref_perc: Game_Preference;
    auth_token: string;
    youtube: string;
    telegram: string;
    twitch: string;
};

export type Community = {
    name: string;
    url: string;
};

type Connected_Game = {
    champions: string;
    created_at: string;
    game_name: string;
    gold_per_minute: number;
    kda: number;
    league_points: number | null;
    losses: number | null;
    losses_per_last_20_games: number;
    queue_type: number | null;
    rank: number | null;
    region: string;
    roles: string;
    server: string;
    tag_line: string;
    tier: string | null;
    uid: string;
    updated_at: string;
    user_games_id: string;
    vision_score: number;
    wins: null;
    wins_per_last_20_games: number;
};

type Game_Preference = Record<string, string>;

type Badge = {
    id: string;
    name: string;
};

export type LoginResponse = User & {
    refresh_token: string;
    auth_token: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};
