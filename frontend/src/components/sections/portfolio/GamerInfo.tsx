import { Badges } from "@/components/table";
import { TbExternalLink } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { UserDetails } from "./UserDetailsScreen";

import Piechart from "@/components/graphs/Piechart";
import { useAppSelector } from "@/redux/hooks";
const GamerInfo = ({ currentUser }: UserDetails) => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 h-full pb-10">
            <div className="bg-[#22163AB2] rounded-2xl font-bold w-full h-full relative">
                <div className="gaming-prefernce-bg-image absolute h-full w-full"></div>
                <div className="flex justify-between  h-full">
                    <div className="p-5 w-full z-10 mb-10 md:mb-0">
                        <span className="text-base font-medium">
                            GAMING PREFERENCES
                        </span>
                        {currentUser?.game_pref_perc && (
                            <div className="flex justify-between relative items-center h-full pt-5 md:pt-0">
                                <div className="text-[#7E768C] flex flex-col space-y-4 text-xs pl-0">
                                    {Object.entries(currentUser?.game_pref_perc)
                                        .slice(
                                            0,
                                            Math.ceil(
                                                Object.entries(
                                                    currentUser?.game_pref_perc
                                                ).length / 2
                                            )
                                        )
                                        .map((s, index) => (
                                            <div
                                                key={index}
                                                className="capitalize"
                                            >
                                                {" "}
                                                {s[0]} {s[1]}%
                                            </div>
                                        ))}
                                </div>
                                {/* <div className="absolute left-1/2 -translate-x-1/2 flex items-center w-full h-full justify-center  ">
                                    <img
                                        src={circlePortfolio}
                                        className="h-[220px] w-[220px] shrink-0 absolute  md:w-full"
                                    />
                                    <div className="text-[16px] break-keep capitalize flex font-semibold  justify-center shrink-0   w-full">
                                        {
                                            Object.entries(
                                                currentUser?.game_pref_perc
                                            )[
                                                Math.ceil(
                                                    Object.entries(
                                                        currentUser?.game_pref_perc
                                                    ).length / 2
                                                )
                                            ][0]
                                        }
                                        &nbsp;
                                        {
                                            Object.entries(
                                                currentUser?.game_pref_perc
                                            )[
                                                Math.ceil(
                                                    Object.entries(
                                                        currentUser?.game_pref_perc
                                                    ).length / 2
                                                )
                                            ][1]
                                        }
                                    </div>
                                </div> */}
                                <div className="absolute left-1/2 -translate-x-1/2 flex items-center w-full h-full justify-center  ">
                                    <Piechart />
                                </div>
                                <div className="text-[#7E768C] flex flex-col space-y-4 text-xs pl-0 md:pl-5">
                                    {Object.entries(currentUser?.game_pref_perc)
                                        .slice(
                                            Math.ceil(
                                                Object.entries(
                                                    currentUser?.game_pref_perc
                                                ).length / 2
                                            ),
                                            Object.entries(
                                                currentUser?.game_pref_perc
                                            ).length
                                        )
                                        .map((s, index) => (
                                            <div
                                                key={index}
                                                className="capitalize"
                                            >
                                                {" "}
                                                {s[0]} {s[1]}%
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="w-full bg-[#22163AB2] relative rounded-2xl max-h-[320px] overflow-y-scroll">
                    <div className="flex items-center px-4 pt-4 justify-between sticky top-0 bg-[#1D1532]">
                        <h1 className="text-[14px] mb-3 ">BADGES</h1>
                        {/* <div className="text-[#7500FF]">view all</div> */}
                    </div>
                    <div className="px-4">
                        {currentUser?.badges.map((badge_data, index) => (
                            <Badge
                                badge_id={badge_data.name}
                                index={index}
                                key={index}
                            />
                        ))}
                    </div>

                    {/* <div className="py-3 flex items-center justify-start space-x-3  w-full">
                        <img src={Level2} className="mr-2" />
                        <p className="text-[14px] px-0 font-medium">
                            MASTER 1
                        </p>
                    </div> */}
                    {/* <div className="py-3 flex items-center justify-start space-x-3  w-full">
                        <img src={Level3} className="mr-2" />
                        <p className="text-[14px] px-0 font-medium">
                            VETERAN Level 1
                        </p>
                    </div> */}
                    {/* <div className="py-3 flex items-center justify-start space-x-3  w-full">
                        <img src={Level4} className="mr-2" />
                        <p className="text-[14px] px-0 font-medium">
                            ELITE Level 1
                        </p>
                    </div> */}
                </div>
                <div className="w-full p-4 bg-[#22163AB2] rounded-2xl h-[320px]">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[14px]">COMMUNITY</h1>
                        {/* <div className="text-[#7500FF]">view all</div> */}
                    </div>
                    {currentUser &&
                        currentUser.communities &&
                        currentUser?.communities.length > 0 &&
                        currentUser?.communities.map((community, index) => (
                            <a
                                href={community.url}
                                key={index}
                                target="_blank"
                                className="text-white hover:underline flex items-center justify-start"
                            >
                                <div className="my-2 py-2  ml-2 text-[16px]">
                                    {community.name}
                                </div>
                                &nbsp;
                                <TbExternalLink />
                            </a>
                        ))}
                    {currentUser && !currentUser.communities && (
                        <div>
                            <p className="text-center mt-20  text-white">
                                No communities found
                            </p>
                            {user?.turf_id === currentUser?.turf_id && (
                                <Link to={"/profile"}>
                                    <div className="text-center mt-1 text-[14px] flex items-center justify-center hover:underline text-white">
                                        <span className="mr-1">
                                            Add your communities
                                        </span>
                                        <TbExternalLink />
                                    </div>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GamerInfo;

const Badge = ({ badge_id, index }: { badge_id: string; index: number }) => {
    if (!badge_id) return null;
    const badge = Badges.filter(
        (a) => a.name.toLocaleLowerCase() === badge_id.toLocaleLowerCase()
    )[0];
    if (!badge) return null;
    return (
        <div
            key={index}
            className="py-2 flex items-center justify-start w-full"
        >
            <Tooltip
                id={`achievements + ${index}`}
                place="top"
                style={{
                    backgroundColor: "#7500FF",
                    color: "#fff",
                    fontWeight: 400,
                    borderRadius: "10px",
                    maxWidth: "250px",
                    textAlign: "center",
                    opacity: 1,
                }}
            />
            <div
                data-tooltip-id={`achievements + ${index}`}
                data-tooltip-content={badge.description}
                className="flex items-center justify-start  cursor-pointer"
            >
                <img src={badge.image} className="mr-2 w-[40px] h-[40px]" />
                <p className="text-[14px] capitalize px-0 font-medium">
                    {badge.name}
                </p>
            </div>
        </div>
    );
};

{
    /* <div className="py-2 mt-3 flex items-center justify-between space-x-3  w-full">
<div className="flex items-center justify-start">
    <div className="w-[40px] h-[40px] bg-black overflow-hidden rounded-full">
        <img
            src="https://static.wixstatic.com/media/adf055_e42823f29f364b9a85d5467943f124e5~mv2.png/v1/fill/w_152,h_152,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/avatar%20white.png"
            className="h-full w-full"
            alt="l8tecny"
        />
    </div>
    <p className="text-[14px] font-medium px-0 ml-2">
        L8tency
    </p>
</div>
<button className="bg-button px-4 rounded-[10px] text-[14px] py-1">
    View
</button>
</div>
<div className="py-2 mt-3 flex items-center justify-between space-x-3  w-full">
<div className="flex items-center justify-start">
    <div className="w-[40px] h-[40px] bg-black overflow-hidden rounded-full">
        <img
            src="https://pbs.twimg.com/profile_images/1666890152898076672/GgXVNGnh_400x400.jpg"
            className="h-full w-full"
            alt="l8tecny"
        />
    </div>
    <p className="text-[14px] font-medium px-0 ml-2">
        the*gamehers
    </p>
</div>
<button className="bg-button px-4 rounded-[10px] text-[14px] py-1">
    View
</button>
</div>
<div className="py-2 mt-3 flex items-center justify-between space-x-3  w-full">
<div className="flex items-center justify-start">
    <div className="w-[40px] h-[40px] bg-black overflow-hidden rounded-full">
        <img
            src="https://pbs.twimg.com/profile_images/1619299124800790528/AJdfUhAe_400x400.jpg"
            className="h-full w-full"
            alt="l8tecny"
        />
    </div>
    <p className="text-[14px] font-medium px-0 ml-2">
        Yoda Labs DAO
    </p>
</div>
<button className="bg-button px-4 rounded-[10px] text-[14px] py-1">
    View
</button>
</div>
<div className="py-2 mt-3 flex items-center justify-between space-x-3  w-full">
<div className="flex items-center justify-start">
    <div className="w-[40px] h-[40px] bg-black overflow-hidden rounded-full">
        <img
            src="https://pbs.twimg.com/profile_images/1681008280028565504/b3ErGR2u_400x400.jpg"
            className="h-full w-full"
            alt="l8tecny"
        />
    </div>
    <p className="text-[14px] font-medium px-0 ml-2">
        VRChat
    </p>
</div>
<button className="bg-button px-4 rounded-[10px] text-[14px] py-1">
    View
</button>
</div> */
}
