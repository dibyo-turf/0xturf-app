import React from "react";

import ValoStatsInfo, { IcePokerInfo } from "./ValoStatsInfo";
import Heading from "@/components/typography/Heading";
import GamerInfo from "./GamerInfo";
import { AnimatePresence, motion } from "framer-motion";
import gamesIcon from "../../../assets/icons/games_btn_icon.svg";
import Arrow from "../../../assets/icons/arrow.svg";
import { useGetPortfolioDataQuery } from "@/redux/api/portfolio";
import { useAppSelector } from "@/redux/hooks";
import UserDetails from "./UserDetailsScreen";
import { Link } from "react-router-dom";
import StatsInfo from "./LeaguesStatsInfo";
const PortfolioSection = ({
    turf_id,
    setActiveState,
}: {
    turf_id: string;
    setActiveState: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { user } = useAppSelector((state) => state.auth);
    const { data } = useGetPortfolioDataQuery(
        {
            turf_id: turf_id,
            user_uid: user?.uid,
        },
        {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        }
    );

    return (
        <div className="mt-10">
            <UserDetails currentUser={data} turf_id={turf_id} />
            <GamerInfo currentUser={data} turf_id={turf_id} />
            {/* {data && data?.connected_games && (
                <>
                    <Heading className="mb-10">League Of Legends</Heading>
                    <StatsInfo data={data.connected_games[0]} />
                </>
            )} */}

            <Heading className="mb-10">Planet X</Heading>
            <ValoStatsInfo />
            <Heading className="mb-10">Ice Poker</Heading>
            <IcePokerInfo />
            {user &&
                user.turf_id === data?.turf_id &&
                data?.connected_games === undefined && (
                    <AddGamesButton setActiveState={setActiveState} />
                )}
        </div>
    );
};

export default PortfolioSection;

const AddGamesButton = ({
    setActiveState,
}: {
    setActiveState: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <div onClick={() => setActiveState(2)}>
            <Link to={"/profile"}>
                <div className="flex items-center justify-center pb-10">
                    <AnimatePresence>
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className=" bg-[#0A0914] p-4 card rounded-[10px] flex items-center cursor-pointer"
                        >
                            <img src={gamesIcon} alt="games" />
                            <div className="text-[14px] px-3 text-[#FFF]">
                                Add Games
                            </div>
                            <img src={Arrow} alt="arrow" />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </Link>
        </div>
    );
};
