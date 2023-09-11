import discordIcon from "@/assets/icons/discord_portfolio.svg";
import facebookIcon from "@/assets/icons/facebook_portfolio.svg";
import badges from "@/assets/icons/game_badges.svg";
import gameServer from "@/assets/icons/game_server.svg";
import Followers from "@/assets/icons/followers.svg";
import Followings from "@/assets/icons/followings.svg";
import region from "@/assets/icons/region.svg";
import shareIcon from "@/assets/icons/share_portfolio.svg";
import youtubeIcon from "@/assets/icons/youtube_portfolio.svg";
import PortfolioBackground from "@/assets/portfolio-bg.png";
import { User } from "@/redux/api/oAuth/types";
import { useAppSelector } from "@/redux/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import editIcon from "../../../assets/icons/edit.svg";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { useFollowUserMutation } from "@/redux/api/portfolio";
import { TbExternalLink } from "react-icons/tb";

const SOCIALS = [
    {
        imgUrl: facebookIcon,
    },
    {
        imgUrl: discordIcon,
    },
    {
        imgUrl: youtubeIcon,
    },
    {
        imgUrl: shareIcon,
    },
];
export const toastStyles = {
    style: {
        boxShadow: "0px 4px 4px 0px #00000040",
        background: "#251F30",
        color: "#fff",
    },
    iconTheme: {
        primary: "#7C40E4",
        secondary: "#FFFAEE",
    },
};
export type UserDetails = {
    currentUser: User | undefined;
    turf_id: string;
};
const UserDetails = ({ currentUser, turf_id }: UserDetails) => {
    const USER_INFO = {
        username: currentUser?.turf_id,
        name: "Daniel Lee",
        userDescription: "lorloremm ddcomdwoc mwmom",
        region: "Canada",
        gamingServer: "Asia, CEE",
        badges: 8,
    };
    const { user } = useAppSelector((state) => state.auth);
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="h-[192px] w-full flex items-center  justify-center rounded-[20px] overflow-hidden relative  mb-10">
                {currentUser?.banner && (
                    <div className=" w-full h-full z-10 bg-[#860CC9] bg-opacity-80 absolute"></div>
                )}
                {currentUser && currentUser.banner ? (
                    <img
                        src={currentUser.banner}
                        alt="bg"
                        className="absolute h-full w-full rounded-xl"
                    />
                ) : (
                    <img
                        src={PortfolioBackground}
                        alt="bg"
                        className="absolute h-full w-full object-cover rounded-xl"
                    />
                )}

                {currentUser && (
                    <div className="flex justify-end items-start absolute top-6 right-10">
                        {SOCIALS.slice(SOCIALS.length - 1, SOCIALS.length).map(
                            (item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            if (
                                                window.location.search
                                                    .length === 0
                                            ) {
                                                navigator.clipboard.writeText(
                                                    window.location.href +
                                                        `?gamer=${user?.turf_id}`
                                                );
                                            } else {
                                                navigator.clipboard.writeText(
                                                    window.location.href
                                                );
                                            }
                                            toast.success(
                                                "Link copied to clipboard",
                                                toastStyles
                                            );
                                        }}
                                        className={`px-3 flex mt-1 z-20 items-center justify-start  ${
                                            index === 3 &&
                                            user &&
                                            user.turf_id === turf_id
                                                ? ""
                                                : index === 3
                                                ? "border-none"
                                                : ""
                                        } cursor-pointer`}
                                    >
                                        <img
                                            src={item.imgUrl}
                                            className="w-[18px] h-[18px]"
                                        />
                                        <span className="ml-2">Share</span>
                                    </div>
                                );
                            }
                        )}
                        <div className="w-[1px] mt-1 h-[22px] bg-[#BDBDBD] mx-2"></div>
                        {/* <div className="mx-2 flex items-center justify-center">
                            <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center  bg-[#58249A] text-[12px] text-white ">{currentUser?.followers_count}</div> <span className="ml-2">Followers</span>
                        </div> */}
                        {/* <div className="w-[1px] mt-1 h-[22px] bg-[#BDBDBD] mx-2"></div> */}
                        <FollowButton
                            turf_id={turf_id}
                            uid={currentUser.uid}
                            has_followed={currentUser.has_followed}
                        />
                        {user && user.turf_id === turf_id && (
                            <Link to={"/profile"} className="z-20">
                                <div className="flex cursor-pointer mt-1.5 text-[#BDBDBD] font-medium flex-wrap items-center pl-3">
                                    <img
                                        src={editIcon}
                                        alt="public"
                                        className="mr-2 w-[16px] h-[16px]"
                                    />
                                    <div className="text-sm">Edit profile</div>
                                </div>
                            </Link>
                        )}
                    </div>
                )}

                <div className="h-[60%] w-full flex items-center justify-start max-w-[92%]   max-h-[100px] z-10">
                    <div className="h-[100px] w-[100px] rounded-full bg-[#5D0B89] overflow-hidden ">
                        {currentUser?.image && (
                            <img
                                src={currentUser?.image}
                                alt=""
                                className="rounded-full h-full w-full object-cover avatar-box-shadow"
                            />
                        )}
                    </div>
                    <div className="pl-6 flex flex-col space-y-1 ">
                        <span className="font-medium text-2xl">
                            {currentUser
                                ? currentUser?.turf_id.replace(".turf", "") +
                                  ".turf"
                                : "-"}
                        </span>
                        <span className="py-1 text-base font-medium">
                            {currentUser
                                ? ` Challenge/${currentUser?.turf_xp} turf-XP`
                                : "-"}
                        </span>
                        <div className="flex items-center space-x-4 justify-start">
                            <div className="flex items-center">
                                <img src={region} />
                                <span className=" text-sm">
                                    <span className="text-[#A8A8A8] px-2">
                                        Region -
                                    </span>
                                    <span>N/A</span>
                                </span>
                            </div>
                            <div className="flex items-center">
                                <img src={badges} />
                                <span className=" text-sm">
                                    <span className="text-[#A8A8A8] px-2">
                                        Badges -
                                    </span>
                                    <span>
                                        {currentUser
                                            ? currentUser.badges.length
                                            : ""}
                                    </span>
                                </span>
                            </div>

                            <div className="flex items-center py-2">
                                <img src={Followings} />
                                <span className=" text-sm">
                                    <span className="text-[#A8A8A8] px-2">
                                        Following -
                                    </span>
                                    <span>{currentUser?.followings_count}</span>
                                </span>
                            </div>
                            <div className="flex items-center">
                                <img src={Followers} />
                                <span className=" text-sm">
                                    <span className="text-[#A8A8A8] px-2">
                                        Followers -
                                    </span>
                                    <span>
                                        {currentUser
                                            ? currentUser.followers_count
                                            : ""}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetails;

const FollowButton = ({
    turf_id,
    uid,
    has_followed,
}: {
    turf_id: string;
    uid: string;
    has_followed: boolean | undefined;
}) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [followUser] = useFollowUserMutation();

    useEffect(() => {
        setIsFollowed(has_followed || false);
    }, [has_followed]);

    if (user && user.turf_id === turf_id) {
        return null;
    }

    return (
        <button
            onClick={async () => {
                try {
                    setIsFollowed(!isFollowed);
                    if (!user || !user.uid) {
                        navigate("/signin");
                    }
                    await followUser({
                        user_uid: uid,
                        follow: !isFollowed,
                    }).unwrap();
                    toast.success(
                        `You have ${!isFollowed ? "Followed" : "Unfollowed"}` +
                            " " +
                            turf_id,
                        toastStyles
                    );
                } catch (error) {
                    toast.error("Something went wrong", toastStyles);
                }
            }}
            className="px-5 z-20 mt-1 ml-2 rounded-lg w-[80px] text-[16px] flex items-center justify-center"
        >
            {!isFollowed ? (
                <span className="flex items-center">
                    <RiUserFollowFill />
                    &nbsp;Follow
                </span>
            ) : (
                <span className="flex items-center">
                    <RiUserUnfollowFill />
                    &nbsp;Unfollow
                </span>
            )}
        </button>
    );
};
