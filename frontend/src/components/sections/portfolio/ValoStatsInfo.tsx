import omenAvatar from "../../../assets/avatars/omenAvatar.png";

const ValoStatsInfo = () => {
    const COMPETITIVE_OVERVIEW_DATA = [
        {
            type: "Kills",
            score: 12426,
        },
        {
            type: "Headshots",
            score: 12426,
        },
        {
            type: "Deaths",
            score: 12426,
        },
        {
            type: "Kills",
            score: 12426,
        },
        {
            type: "Headshots",
            score: 12426,
        },
        {
            type: "Deaths",
            score: 12426,
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full pb-10">
            <div className="portfolio-card-linear-1 rounded-2xl font-bold">
                <div className="grid grid-cols-3 gap-4 h-full">
                    <div className="col-span-2 p-5">
                        <div className="">Top agent</div>
                        <div className="text-[#E84F64] font-antonio text-[40px] mt-4 tracking-tighter">
                            OMEN
                        </div>
                        <div className="bg-[#34262F] h-[1px] w-full my-5"></div>
                        <div className="flex justify-between">
                            <div className="text-[#9C8995] text-[14px] font-semibold">
                                Win ratio
                            </div>
                            <div className="text-[#9C8995] text-[14px] font-semibold">
                                K/D Ratio
                            </div>
                            <div className="text-[#9C8995] text-[14px] font-semibold">
                                Dmg Ratio
                            </div>
                        </div>
                        <div className="flex font-bold justify-between">
                            <div>62.11</div>
                            <div>1.14</div>
                            <div>138.2</div>
                        </div>
                        <div className="text-[#9C8995] text-[14px] font-semibold pt-3">
                            Ability Kills/Match
                        </div>
                        <div className="flex font-bold justify-between">
                            <div>62.11</div>
                            <div>62.11</div>
                            <div>62.11</div>
                        </div>
                    </div>
                    <img
                        src={omenAvatar}
                        alt="omen_avatar"
                        className="object-cover h-full pr-0 md:pr-3"
                    />
                </div>
            </div>
            <div className=" bg-[#22163A] rounded-2xl h-full px-5 pt-5">
                <div className="font-bold flex justify-between">
                    <div className="">COMPETITVE OVERVIEW</div>
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
                    <div className="progress-bar-valorant relative">
                        <div className="py-8 text-center">
                            <div className="text-[#9C8995] text-xs">
                                Win ratio
                            </div>
                            <div className="font-bold text-xs">62.11%</div>
                        </div>
                    </div>
                    <div className="col-span-2 md:flex gap-4">
                        <div className="overview-border w-full border-l-[3px]  border-[#3D90B7] h-fit p-2 mt-0 md:mt-5">
                            <div className="font-bold">925 WINS</div>
                        </div>
                        <div className="overview-border-loss w-full border-l-[3px]  border-[#F65962] p-2 h-fit mt-5">
                            <div className="font-bold">791 LOSE</div>
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
                </div>
            </div>
        </div>
    );
};

export const IcePokerInfo = () => {
    const COMPETITIVE_OVERVIEW_DATA = [
        {
            type: "Kills",
            score: 12426,
        },
        {
            type: "Headshots",
            score: 12426,
        },
        {
            type: "Deaths",
            score: 12426,
        },
        {
            type: "Kills",
            score: 12426,
        },
        {
            type: "Headshots",
            score: 12426,
        },
        {
            type: "Deaths",
            score: 12426,
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full pb-10">
            <div className="portfolio-card-linear-1 rounded-2xl font-bold">
                <div className="grid grid-cols-3 gap-4 h-full">
                    <div className="col-span-2 p-5">
                        <div className="">Top agent</div>
                        <div className="text-[#E84F64] font-antonio text-[40px] mt-4 tracking-tighter">
                            OMEN
                        </div>
                        <div className="bg-[#34262F] h-[1px] w-full my-5"></div>
                        <div className="flex justify-between">
                            <div className="text-[#9C8995] text-[14px] font-semibold">
                                Win ratio
                            </div>
                            <div className="text-[#9C8995] text-[14px] font-semibold">
                                K/D Ratio
                            </div>
                            <div className="text-[#9C8995] text-[14px] font-semibold">
                                Dmg Ratio
                            </div>
                        </div>
                        <div className="flex font-bold justify-between">
                            <div>62.11</div>
                            <div>1.14</div>
                            <div>138.2</div>
                        </div>
                        <div className="text-[#9C8995] text-[14px] font-semibold pt-3">
                            Ability Kills/Match
                        </div>
                        <div className="flex font-bold justify-between">
                            <div>62.11</div>
                            <div>62.11</div>
                            <div>62.11</div>
                        </div>
                    </div>
                    <img
                        src={omenAvatar}
                        alt="omen_avatar"
                        className="object-cover h-full pr-0 md:pr-3"
                    />
                </div>
            </div>
            <div className=" bg-[#22163A] rounded-2xl h-full px-5 pt-5">
                <div className="font-bold flex justify-between">
                    <div className="">COMPETITVE OVERVIEW</div>
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
                    <div className="progress-bar-valorant relative">
                        <div className="py-8 text-center">
                            <div className="text-[#9C8995] text-xs">
                                Win ratio
                            </div>
                            <div className="font-bold text-xs">62.11%</div>
                        </div>
                    </div>
                    <div className="col-span-2 md:flex gap-4">
                        <div className="overview-border w-full border-l-[3px]  border-[#3D90B7] h-fit p-2 mt-0 md:mt-5">
                            <div className="font-bold">925 WINS</div>
                        </div>
                        <div className="overview-border-loss w-full border-l-[3px]  border-[#F65962] p-2 h-fit mt-5">
                            <div className="font-bold">791 LOSE</div>
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
                </div>
            </div>
        </div>
    );
};

export default ValoStatsInfo;
