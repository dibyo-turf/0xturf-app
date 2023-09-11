import React from "react";
import challengerVector from "../../../assets/challenger.svg";
import Heading from "@/components/typography/Heading";
import { useGetLeaderBoardGamesQuery } from "@/redux/api/games";
import LOL from "../../../assets/lol.jpeg";
import VALO from "../../../assets/Valorant.png";
import { TbExternalLink } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/table";
const LeaderBoardStats = () => {
    const { data, isSuccess } = useGetLeaderBoardGamesQuery();
    const navigate = useNavigate();
    return (
        <div className="mb-10">
            <Heading>LEADERBOARD</Heading>
            <div className="flex w-full gap-8 mt-10">
                {isSuccess &&
                    data &&
                    data.length > 0 &&
                    data.slice(0, 1).map((item, index) => {
                        return (
                            <div
                                className="rounded-2xl bg-design w-4/6 relative"
                                key={index}
                            >
                                <div className="absolute w-full h-full leaderboard-stats-bg"></div>
                                <div className="flex flex-col items-center justify-center p-5 h-full w-full">
                                    <div className="flex items-center">
                                        <span className="text-[36px] font-medium ">
                                            {index + 1}
                                        </span>
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                height={60}
                                                width={60}
                                                className="rounded-full my-5 mx-8 avatar-box-shadow"
                                            />
                                            <div className="h-[80px] w-[80px] absolute inset-0 ring-[0.9px] ring-[#D9D9D9] rounded-full left-[22px] top-[10px]"></div>
                                            <div className="h-[95px] w-[95px] absolute inset-0 ring-[0.5px] ring-[#D9D9D9] rounded-full left-[14px] top-[2.5px]"></div>
                                        </div>
                                        <Link
                                            to={
                                                "/portfolio?gamer=" +
                                                item.turf_id
                                            }
                                            className="z-20 text-white hover:text-white"
                                        >
                                            <span className="text-[22px] flex items-center justify-start hover:underline z-10 cursor-pointer font-semibold">
                                                {item.turf_id}.turf&nbsp;
                                                <TbExternalLink />
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="flex flex-col pt-5">
                                        <div className="flex items-center">
                                            <img
                                                src={challengerVector}
                                                className="w-[20px] h-[20px]"
                                            />
                                            <span className="text-base font-bold px-2">
                                                Challenger / 1896 turf-XP
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 justify-center pt-6">
                                            {item.games.length > 0 && (
                                                <div className="w-[40px]  h-[40px] rounded-full overflow-hidden">
                                                    <img
                                                        src={LOL}
                                                        className="w-full h-full"
                                                        alt="LOL"
                                                    />
                                                </div>
                                            )}
                                            {/* <div className="w-[40px]  h-[40px] mt-6 rounded-full overflow-hidden">
                                            <img src={VALO} className="w-full h-full" alt="VALO" />
                                        </div> */}
                                            {/* {item.badges.map((badge, index) => <Badge badge_id={badge.name} key={index} index={index} />)} */}
                                        </div>

                                        {/* <div className="mx-auto pt-3">
                                        {item.discord}% / {item.discord}{" "}
                                        games
                                    </div> */}
                                        {/* <div className="bg-[#FFFFFF] w-full rounded-full overflow-hidden h-[6px] mt-1 relative ">
                                        <div
                                            className={`bg-gamesProgress absolute w-[${item.discord}%] h-full top-0 left-0`}
                                        ></div>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                <div className="grid grid-cols-2 w-full gap-8">
                    {isSuccess &&
                        data &&
                        data.length > 0 &&
                        data.slice(1, 5).map((item, index) => {
                            return (
                                <div
                                    className="bg-[#1E1432] relative rounded-2xl p-7 flex items-center justify-center"
                                    key={index}
                                >
                                    <span className="text-lg font-medium text-[#92929D]">
                                        {index + 2}
                                    </span>
                                    <img
                                        src={item.image}
                                        height={40}
                                        width={40}
                                        className="rounded-full avatar-box-shadow mx-3"
                                    />
                                    <div className="flex  flex-col justify-center w-full">
                                        <Link
                                            to={
                                                "/portfolio?gamer=" +
                                                item.turf_id
                                            }
                                            className="text-sm  cursor-pointer flex hover:underline items-center justify-start font-semibold"
                                        >
                                            {item.turf_id.replace(".turf", "")}
                                            .turf&nbsp;
                                            <TbExternalLink />
                                        </Link>
                                        <div className="flex absolute flex-col top-[38%] space-y-2 right-4 items-center  justify-center">
                                            {/* <div className="w-[25px]  h-[25px]  rounded-full overflow-hidden">
                                            <img src={VALO} className="w-full h-full" alt="VALO" />
                                        </div> */}
                                            {item.games.length > 0 && (
                                                <div className="w-[25px]  h-[25px]  rounded-full overflow-hidden">
                                                    <img
                                                        src={LOL}
                                                        className="w-full h-full"
                                                        alt="LOL"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-[#D9D9D9] text-xs mt-1">
                                            Challenger / {item.turf_xp} turf-XP
                                        </div>

                                        {/* <div className="bg-[#92929D] w-full rounded-full overflow-hidden h-[4px] mt-2 relative ">
                                        <div
                                            className={`bg-gamesProgress absolute w-[${item.discord}%] h-full top-0 left-0`}
                                        ></div>
                                    </div> */}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default LeaderBoardStats;
