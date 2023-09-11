import React from "react";
import preferedBadge1 from "@/assets/prefered_badge_1.svg";
import preferedBadge2 from "@/assets/prefered_badge_2.svg";
import preferedBadge3 from "@/assets/prefered_badge_3.svg";
import preferedBadge4 from "@/assets/prefered_badge_4.svg";
import arcadeAvatar from "@/assets/icons/arcade_icon.png";
const StatsInfo = ({ data }: any) => {
    const COMPETITIVE_OVERVIEW_DATA = [
        {
            type: "KDA",
            score: data.kda,
        },
        {
            type: "Gold/min",
            score: parseInt(data.gold_per_minute),
        },
        {
            type: "Vision score",
            score: data.vision_score,
        },
    ];
    //this will get max username role
    interface ChampionData {
        [key: string]: number;
    }
    const parsedData: ChampionData = JSON.parse(data.champions);

    const [userWithMaxNumber]: [string | null, number] = Object.entries(
        parsedData
    ).reduce(
        (
            [maxUser, maxValue]: [string | null, number],
            [user, value]: [string, number]
        ) => (value > maxValue ? [user, value] : [maxUser, maxValue]),
        [null, -Infinity]
    );
    //this will get max prefered role
    interface PreferedRoleData {
        [key: string]: number;
    }
    const roleParsedData: PreferedRoleData = JSON.parse(data.roles);
    const [roleWithMaxNumber]: [string | null, number] = Object.entries(
        roleParsedData
    ).reduce(
        (
            [maxUser, maxValue]: [string | null, number],
            [user, value]: [string, number]
        ) => (value > maxValue ? [user, value] : [maxUser, maxValue]),
        [null, -Infinity]
    );
    const winRationNumber = (data.wins / (data.wins + data.losses)) * 100;
    const winRatio = Number(winRationNumber.toFixed(2));
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full pb-10">
            <div className="portfolio-card-linear-1 rounded-2xl font-bold">
                <div className="grid grid-cols-3 gap-4 h-full">
                    <div className="col-span-2 p-5">
                        <div className="">Top agent</div>
                        <div className="flex items-center">
                            <div className="text-[#7500FF] font-antonio text-[40px] mt-4 tracking-tighter">
                                {userWithMaxNumber}
                            </div>
                            <div className="text-[#9C8995] font-bold pl-16 pt-4 text-[16px]">
                                Server
                                <p className="text-[14px]">
                                    {data.server.toUpperCase()}
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#34262F] h-[1px] w-full my-5"></div>
                        <div className="flex justify-between">
                            <div>
                                <div className="text-[#9C8995] text-[14px] font-semibold">
                                    Rank
                                </div>
                                <div>{data.rank}</div>
                            </div>
                            <div>
                                <div className="text-[#9C8995] text-[14px] font-semibold">
                                    LP
                                </div>
                                <div>{data.league_points}</div>
                            </div>
                            <div>
                                <div className="text-[#9C8995] text-[14px] font-semibold">
                                    Queue type
                                </div>
                                <div>{data.queue_type.toUpperCase(0)}</div>
                            </div>
                        </div>
                        {/* <div className="flex justify-between">
                            <div className="text-[#9C8995] text-[14px] font-semibold">
                                Rank
                            </div>
                            <div className="text-[#9C8995] text-[14px] font-semibold">
                                LP
                            </div>
                            <div className="text-[#9C8995] text-[14px] font-semibold">
                                Queue type
                            </div>
                        </div>
                        <div className="flex font-bold justify-between">
                            <div>62.11</div>
                            <div>1.14</div>
                            <div>138.2</div>
                        </div> */}
                        <div className="text-[#9C8995] text-[14px] font-semibold pt-5">
                            Prefered role
                        </div>
                        <div className="flex item-center gap-4 pt-4">
                            <img src={preferedBadge1} />
                            <img src={preferedBadge2} />
                            <img src={preferedBadge3} />
                            <img src={preferedBadge4} />
                        </div>
                    </div>
                    <img
                        src={arcadeAvatar}
                        alt="arcade_avatar"
                        className="object-cover h-full"
                    />
                </div>
            </div>
            <div className=" bg-[#22163A] rounded-2xl h-full px-5 pt-5">
                <div className="font-bold flex justify-between">
                    <div className="text-[#7500FF]">{data.game_name}</div>
                </div>
                {/* <div className="text-sm font-semibold py-5">
                    <div className="flex justify-between gap-8 h-[45px]">
                        <div className="w-full">
                            <div className="progress-bar relative">
                                <div className="py-8 text-center">
                                    <div className="text-[#9C8995] text-xs">
                                        Win ratio
                                    </div>
                                    <div className="font-bold text-xs">
                                        62.11%
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overview-border w-full border-l-[3px] border-[#3D90B7] pl-2">
                            <div className="py-3">925 WINS</div>
                        </div>
                        <div className="overview-border-loss w-full border-l-[3px] border-[#F65962] pl-2">
                            <div className="py-3">791 LOSE</div>
                        </div>
                    </div>
                </div> */}
                <div className="grid grid-cols-3 pt-10 gap-24 md:gap-0">
                    <div
                        className="progress-bar relative"
                        style={{
                            background: `radial-gradient(closest-side, #22163a 79%, transparent 80% 100%),
                        conic-gradient(#3ab299 ${winRatio}%, #3b2b48 0)`,
                        }}
                    >
                        <div className="py-8 text-center">
                            <div className="text-[#9C8995] text-xs">
                                Win ratio
                            </div>
                            <div className="font-bold text-xs">{winRatio}%</div>
                        </div>
                    </div>
                    <div className="col-span-2 md:flex gap-4">
                        <div className="overview-border w-full border-l-[3px]  border-[#3D90B7] h-fit p-2 mt-0 md:mt-5">
                            <div className="font-bold">{data.wins} WINS</div>
                        </div>
                        <div className="overview-border-loss w-full border-l-[3px]  border-[#F65962] p-2 h-fit mt-5">
                            <div className="font-bold">{data.losses} LOSE</div>
                        </div>
                    </div>
                </div>
                <div className="text-sm font-semibold pt-12 md:pt-8 pb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* <div className="progress-bar relative">
                        <div className="py-8 text-center">
                            <div className="text-[#9C8995] text-xs">
                                Win ratio
                            </div>
                            <div className="font-bold text-xs">62.11%</div>
                        </div>
                    </div>

                    <div className="overview-border w-full border-l-[3px]  border-[#3D90B7] h-fit p-2 mt-0 md:mt-5">
                        <div className="font-bold">925 WINS</div>
                    </div>

                    <div className="overview-border-loss w-full border-l-[3px]  border-[#F65962] p-2 h-fit mt-5">
                        <div className="font-bold">791 LOSE</div>
                    </div> */}

                    {COMPETITIVE_OVERVIEW_DATA.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="overview-border w-full border-l-[3px]  border-[#3D90B7] pb-2 pt-1 pl-3"
                            >
                                <div className="text-[#9C8995] text-[12px]">
                                    {item.type}
                                </div>
                                <div>{item.score}</div>
                            </div>
                        );
                    })}

                    <div className="overview-border w-full border-l-[3px]  border-[#3D90B7] pb-2 pt-1 pl-3">
                        <div className="text-[#9C8995] text-[12px]">
                            Wins@20
                        </div>
                        <div>{data.wins_per_last_20_games}</div>
                    </div>
                    <div className="overview-border-loss w-full border-l-[3px]  border-[#F65962]  pb-2 pt-1 pl-3">
                        <div className="text-[#9C8995] text-[12px]">
                            Losses@20
                        </div>
                        <div>{data.losses_per_last_20_games}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsInfo;
