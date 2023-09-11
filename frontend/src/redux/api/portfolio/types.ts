import { User } from "../oAuth/types";

export type PortfolioData = {
    data: { user: User };
};
export type PortfolioDataRequest = {
    turf_id: string;
    user_uid?: string;
};
