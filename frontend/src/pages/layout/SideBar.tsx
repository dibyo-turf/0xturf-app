import Logo from "../../components/logo";
import React, { useMemo } from "react";
import SearchIcon from "../../assets/icons/navbar/search.svg";
import SelectedSearchIcon from "../../assets/icons/navbar/search_active.svg";
import DashboardIcon from "../../assets/icons/navbar/dashboard.svg";
import CommunityIcon from "../../assets/icons/navbar/community.svg";
import CommunitySelectedIcon from "../../assets/icons/navbar/community_active.svg";
import LeaderboardIcon from "../../assets/icons/navbar/leaderboard.svg";
import LeaderboardSelectedIcon from "../../assets/icons/navbar/leaderboard_active.svg";
import GameIcon from "../../assets/icons/navbar/games.svg";
import GamesSelectedIcon from "../../assets/icons/navbar/games_active.svg";
import PortfolioSelected from "../../assets/icons/navbar/portfolio_active.svg";
import { Link, useLocation } from "react-router-dom";
import clsxm from "../../lib/clsxm";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";

const links = [
    {
        name: "Search",
        icon: SearchIcon,
        selectedIcon: SelectedSearchIcon,
        link: "/",
    },

    // {
    //     name: "Communities",
    //     icon: CommunityIcon,
    //     link: "/communities"
    //      selectedIcon : CommunitySelectedIcon
    // },
    {
        name: "Leaderboard",
        icon: LeaderboardIcon,
        selectedIcon: LeaderboardSelectedIcon,
        link: "/leaderboard",
    },
    {
        name: "Portfolio",
        icon: DashboardIcon,
        selectedIcon: PortfolioSelected,
        link: "/portfolio",
    },
    // {
    //     name: "Games",
    //     icon: GameIcon,
    //     link: "/games"
    // selectedIcon: GamesSelectedIcon
    // },
]
const Sidebar = ({ isExpanded }: { isExpanded: boolean }) => {
    const { pathname } = useLocation();
    const { accessToken, user } = useAppSelector(state => state.auth)
    const memoLinks = useMemo(() => {
        return links.filter((link) => !user ? link.name !== "Portfolio" : link.name)
    }, [user])

    return (
        <div className="w-full flex shrink-0 items-start min-h-screen  flex-col h-full justify-center">
            <div className="w-fit z-20  flex flex-col  px-4 absolute top-0 justify-center items-center -mt-4">
                <Logo />
            </div>
            <div className="flex flex-col space-y-1.5 justify-between w-full">
                {memoLinks.map((link, index) => (
                    <Link
                        to={link.link}
                        key={index}
                        className={clsxm(
                            "flex pl-10 items-center justify-start cursor-pointer h-[50px]",
                            pathname === link.link ? "bg-[#0A0914] " : ""
                        )}
                    >
                        <img
                            src={
                                pathname === link.link
                                    ? link.selectedIcon
                                    : link.icon
                            }
                            className="w-[24px] h-[24px]"
                        />
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.p
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                    className="ml-2 text-[14px]"
                                >
                                    {link.name}
                                </motion.p>
                            )}
                        </AnimatePresence>
                        {pathname === link.link && <Indicator />}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

const Indicator = () => (
    <svg
        width={3}
        height={20}
        viewBox="0 0 3 20"
        className="absolute left-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 0C1.65685 0 3 1.34315 3 3L3 17C3 18.6569 1.65685 20 0 20L0 0Z"
            fill="#7500FF"
        />
    </svg>
);
