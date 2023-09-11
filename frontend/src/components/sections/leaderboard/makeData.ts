import { faker } from "@faker-js/faker";

export type TurfLeaderboardUsers = {
    rank_id: string;
    turf_id: string;
    tier: string;
    turf_xp: string;
    acheivement: string;
};

const range = (len: number) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = (): TurfLeaderboardUsers => {
    return {
        rank_id: faker.datatype.number(100).toString(),
        turf_id: faker.name.lastName(),
        turf_xp: faker.datatype.number(40).toString(),
        tier: faker.name.jobType().toString(),
        acheivement: faker.datatype.number(40).toString(),
    };
};

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): TurfLeaderboardUsers[] => {
        const len = lens[depth];
        return range(len).map((d): TurfLeaderboardUsers => {
            return {
                ...newPerson(),
            };
        });
    };

    return makeDataLevel();
}
