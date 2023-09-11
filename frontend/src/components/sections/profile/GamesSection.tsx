import Dropdown from "@/components/dropdown";
import React from "react";
import lol_image from "@/assets/lol_img_profile.png";
import { useAddGamesMutation } from "@/redux/api/games";
import { useGetPortfolioDataQuery } from "@/redux/api/portfolio";
import { useAppSelector } from "@/redux/hooks";
import { RiLoader2Fill } from "react-icons/ri";

const regionData = [
    { value: "americas", name: "AMERICAS" },
    { value: "asia", name: "ASIA" },
    { value: "europe", name: "EUROPE" },
    { value: "sea", name: "SEA" },
];
const serverData = [
    { value: "br1", name: "BR1" },
    { value: "eun1", name: "EUN1" },
    { value: "euw1", name: "EUW1" },
    { value: "jp1", name: "JP1" },
    { value: "kr", name: "KR" },
    { value: "la1", name: "LA1" },
    { value: "la2", name: "LA2" },
    { value: "na1", name: "NA1" },
    { value: "oc1", name: "OC1" },
    { value: "pbe1", name: "PBE1" },
    { value: "ph2", name: "PH2" },
    { value: "ru", name: "RU" },
    { value: "sg2", name: "SG2" },
    { value: "th2", name: "TH2" },
    { value: "tr1", name: "TR1" },
    { value: "tw2", name: "TW2" },
    { value: "vn2", name: "VN2" },
];

export const gameDataInitialState = {
    game_id: "762af2a5-ab2e-46bb-9f00-edc13d2b9848",
    region: "",
    server: "",
    username: "",
    player_tag: "",
};

const GamesSection = ({
    gameData,
    setGameData,
}: {
    gameData: typeof gameDataInitialState;
    setGameData: React.Dispatch<
        React.SetStateAction<typeof gameDataInitialState>
    >;
}) => {
    const { user } = useAppSelector((state) => state.auth);
    const { data, isLoading } = useGetPortfolioDataQuery(
        {
            turf_id: user?.turf_id as string,
        },
        {
            skip: !user?.turf_id,
        }
    );
    const game =
        data && data.connected_games && data.connected_games.length > 0
            ? data.connected_games[0]
            : null;

    if (isLoading) {
        return (
            <div className="h-[200px] w-full bg-[#22163A] my-10 rounded-2xl flex items-center justify-center">
                <RiLoader2Fill className="animate-spin" />
            </div>
        );
    }
    if (game) {
        return (
            <div className="h-[200px] w-full bg-[#22163A] my-10 rounded-2xl flex items-center justify-center">
                You have already connected League of Legends
            </div>
        );
    } else {
        return (
            <div className="mt-12  bg-[#22163A] py-10 rounded-2xl mb-10">
                <div className="font-bold text-xl pb-8 pl-10">
                    Enter your League Of Legends Details Below
                </div>
                <div className="grid grid-cols-4">
                    <div className="col-span-3">
                        <div className="w-10/12 px-10 ">
                            <Dropdown
                                options={regionData}
                                selectedOption={{
                                    name: gameData.region,
                                    value: gameData.region,
                                }}
                                setSelectedOption={(value) => {
                                    if (!value) return;
                                    setGameData({
                                        ...gameData,
                                        region: value.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="w-10/12 px-10 pt-6">
                            <Dropdown
                                options={serverData}
                                selectedOption={{
                                    name: gameData.server,
                                    value: gameData.server,
                                }}
                                setSelectedOption={(value) => {
                                    if (!value) return;
                                    setGameData({
                                        ...gameData,
                                        server: value.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="flex gap-5 pt-8 px-10">
                            <div className="w-[82%] relative">
                                <div className="absolute text-sm bottom-[75%] z-10 left-4 bg-[#22163A] text-[#7E768C] tracking-wide">
                                    Player tag
                                </div>
                                <input
                                    className="h-[42px] border-[#413055] focus:border-[#413055] text-sm"
                                    onChange={(e) => {
                                        setGameData((prevSocials) => ({
                                            ...prevSocials,
                                            player_tag: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-5 pt-8 px-10">
                            <div className="w-[82%] relative">
                                <div className="absolute text-sm bottom-[75%] z-10 left-4 bg-[#22163A] text-[#7E768C] tracking-wide">
                                    Username
                                </div>
                                <input
                                    className="h-[42px] border-[#413055] focus:border-[#413055] text-sm"
                                    onChange={(e) => {
                                        setGameData((prevSocials) => ({
                                            ...prevSocials,
                                            username: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pt-5 relative">
                        <img
                            src={lol_image}
                            className="absolute right-16 top-16"
                        />
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default GamesSection;
