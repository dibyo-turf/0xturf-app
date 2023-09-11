export type GlobalSearchRequest = {
    query_value: string;
};

type Data = {
    name: string;
    imgUrl: string;
};

export type GlobalSearchResponse = Data[];
