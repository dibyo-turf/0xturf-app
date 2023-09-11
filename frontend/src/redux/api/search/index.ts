import { api } from "..";
import { User } from "../oAuth/types";
import { GlobalSearchRequest, GlobalSearchResponse } from "./types";

export const searchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        globalSearch: builder.query<GlobalSearchResponse, GlobalSearchRequest>({
            query: ({ query_value }) => ({
                url: "/users/search?query_value=" + query_value,
                method: "GET",
            }),
            transformResponse: (response: {
                data: {
                    data: {
                        type: string;
                        data: User[];
                    }[];
                };
            }) => {
                // response.data.data.map((item) => {
                //     if (item.type === "User") {
                //         item.data = userData[0].data.map((user) => {
                //             return {
                //                 name: user.name,
                //                 imgUrl: user.turf_id,
                //             };
                //         });
                //     } else if (item.type === "Games") {
                //         item.data = userData[1].data;
                //     }
                // });
                return response.data.data
                    .map((d) => d.data)
                    .filter((d) => d.length !== 0)
                    .flat()
                    .map((d) => {
                        return {
                            name: d.turf_id,
                            imgUrl: d.image,
                        };
                    });
            },
        }),
    }),
});

export const { useGlobalSearchQuery } = searchApi;
