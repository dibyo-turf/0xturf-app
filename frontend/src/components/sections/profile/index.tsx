import Profile_discrod from "@/assets/icons/discord_profile_icon.svg";
import TwitchIcon from "@/assets/icons/twitch.svg";
import Telegram_Icon from "@/assets/icons/telegram_profile_logo.svg";
import Youtube_Icon from "@/assets/icons/youtube_profile.svg";
import AvatarModal from "@/components/modal/AvatarModal";
import Heading from "@/components/typography/Heading";
import { AUTH_KEYS } from "@/pages/AuthGaurd";
import Layout from "@/pages/layout";
import { gamesApi, useAddGamesMutation } from "@/redux/api/games";
import { useUpdateUserMutation } from "@/redux/api/user";
import discord_icon from "@/assets/icons/discord_btn_icon_white.svg";
import discordBtn from "../../../assets/icons/discord_btn.svg";
import {
    removeAccessTokens,
    removeoAuthTokens,
    setInitialState,
} from "@/redux/features/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Arrow from "../../../assets/icons/arrow.svg";
import { toastStyles } from "../portfolio/UserDetailsScreen";
import {
    CheckBox,
    Suggestions,
    handleInputValidation,
} from "../registration/Identity";
import GamesSection, { gameDataInitialState } from "./GamesSection";
import { communityInputField } from "./type";
import { getImage } from "../registration/ChooseAvatar";
import ImageEditor from "./ImageEditor";
import { IN_APP_DISCORD_URL } from "@/config";
import { useDebounce } from "usehooks-ts";
const IS_PROD = import.meta.env.PROD;
const Profile = ({
    activeState,
    setActiveState,
}: {
    activeState: number;
    setActiveState: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [chosenAvatar, setChosenAvatar] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const userSocialsInitialState = {
        discord: "",
        youtube: "",
        telegram: "",
        twitch: "",
    };
    const [gameData, setGameData] = React.useState(gameDataInitialState);
    const [addGames, { data }] = useAddGamesMutation();

    const [socialsData, setSocialsData] = React.useState(
        userSocialsInitialState
    );
    const [updateUser] = useUpdateUserMutation();
    const [apiState, setApiState] = useState<
        "none" | "loading" | "success" | "error"
    >("none");
    const [userNameValues, setUserNameValues] = useState<string[]>([]);
    const [userState, setUserState] = useState("");
    const [turfId, setTurfId] = useState<string>("");

    const [imageData, setImageData] = useState<File | null>(null);

    const [inputFields, setInputFields] = useState<communityInputField[]>([
        {
            name: "",
            url: "",
        },
    ]);
    const [showBorderError, setShowBorderError] = useState(false);

    const handleAddField = () => {
        if (inputFields.length < 5) {
            setInputFields([...inputFields, { name: "", url: "" }]);
        }
    };
    const handleRemoveField = (index: number) => {
        const newFields = [...inputFields];
        newFields.splice(index, 1);
        setInputFields(newFields);
    };
    const isTurfTokenPresent = localStorage.getItem(
        AUTH_KEYS.TURF_ACCESS_TOKEN
    );

    const handleAddGames = async () => {
        // const url = "https://d3fn8xwanmatys.cloudfront.net/v1/riot/lol";
        // const requestOptions = {
        //     method: "POST",
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem(
        //             AUTH_KEYS.TURF_ACCESS_TOKEN
        //         )}`,
        //     },
        //     body: JSON.stringify({
        //         game_id: gameData.game_id,
        //         region: gameData.region,
        //         server: gameData.server,
        //         player_tag: gameData.player_tag,
        //         username: gameData.username,
        //     }),
        // };
        try {
            // const data = await fetch(url, requestOptions);
            // const d = await data.json();
            // console.log(d);
            toast.loading("Adding game...", toastStyles);

            const data = await addGames({
                game_id: gameData.game_id,
                region: gameData.region,
                server: gameData.server,
                player_tag: gameData.player_tag,
                username: gameData.username,
            }).unwrap();

            if (data) {
                toast.dismiss();
                toast.success("Game added successfully", toastStyles);
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Something went wrong, please try again", toastStyles);
        }
    };

    const handleUpdateData = async () => {
        try {
            toast.loading("Saving changes...", toastStyles);
            const socials = {} as {
                discord: string;
                youtube: string;
                telegram: string;
                twitch: string;
                communities: {
                    name: string;
                    url: string;
                }[];
            };
            if (
                socialsData.discord !== "" &&
                socialsData.discord !== user?.discord
            ) {
                socials.discord = socialsData.discord;
            }
            if (
                socialsData.youtube !== "" &&
                socialsData.youtube !== user?.youtube
            ) {
                socials.youtube = socialsData.youtube;
            }
            if (
                socialsData.telegram !== "" &&
                socialsData.telegram !== user?.telegram
            ) {
                socials.telegram = socialsData.telegram;
            }
            if (
                socialsData.twitch !== "" &&
                socialsData.twitch !== user?.twitch
            ) {
                socials.twitch = socialsData.twitch;
            }
            const communities = inputFields.filter((e) => e.name !== "");
            if (communities.length > 0) {
                socials.communities = communities;
            }
            // Add form Data
            const updateUserData = new FormData();
            if (chosenAvatar !== null) {
                updateUserData.append("image", getImage(chosenAvatar));
            }
            if (imageData) {
                updateUserData.append("banner", imageData);
            }
            if (turfId !== user?.turf_id) {
                updateUserData.append("turf_id", turfId);
            }
            if (Object.keys(socials).length > 0) {
                updateUserData.append("socials", JSON.stringify(socials));
            }
            await updateUser(updateUserData).unwrap();

            toast.dismiss();
            toast.success("Changes saved successfully", toastStyles);
        } catch (error) {
            toast.dismiss();
            toast.error("Something went wrong, please try again", toastStyles);
        }
    };
    const handleTurfValidation = async () => {
        if (debouncedValue.length < 5) return;
        try {
            const data = await dispatch(
                gamesApi.endpoints.searchUsers.initiate({
                    query_value: debouncedValue,
                })
            ).unwrap();
            if (data.user === null) {
                setUserState("");
                setApiState("success");
            } else {
                setUserNameValues(data?.suggestionTurfID);
                setUserState("TurfId already exists");
                setApiState("error");
            }
        } catch (error) {
            setApiState("none");
        }
    };
    const debouncedValue = useDebounce<string>(turfId, 500);
    React.useEffect(() => {
        handleTurfValidation();
    }, [debouncedValue]);

    React.useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        const error = new URLSearchParams(window.location.search).get("error");
        if (code) {
            fetch("https://discord.com/api/v10/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: "1149027517060087810",
                    client_secret: "kAY6zVtS1cI0VRXjSnqun1Nx7ztIEM9j",
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: IS_PROD
                        ? "https://turf-app.vercel.app/profile"
                        : "http://localhost:3000/profile",
                }).toString(),
            })
                .then((response) => response.json())
                .then((data) => {
                    try {
                        const headers = {
                            Authorization: `Bearer ${data.access_token}`,
                        };
                        fetch("https://discord.com/api/v10/users/@me", {
                            method: "GET",
                            headers: headers,
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                setSocialsData((prevSocials) => ({
                                    ...prevSocials,
                                    discord: data.username,
                                }));
                                navigate("/profile");
                            });
                    } catch (error) {
                        toast.dismiss();
                        toast.error(
                            "Something went wrong, please try again",
                            toastStyles
                        );
                    }
                })
                .catch((error) => {
                    console.error("Error fetching access token:", error);
                });
        }
        if (!isTurfTokenPresent) {
            navigate("/signin");
        }
        if (error) {
            navigate("/profile");
        }
    }, []);
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowBorderError(false);
        }, 3000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [showBorderError]);
    React.useEffect(() => {
        if (user) {
            setSocialsData({
                discord: user.discord,
                youtube: user.youtube,
                telegram: user.telegram,
                twitch: user.twitch,
            });
            if (user.communities && user.communities.length > 0) {
                setInputFields(user.communities);
            }
        }
    }, [user]);
    return (
        <Layout>
            <AvatarModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                getChoseAvatar={(value) => {
                    setChosenAvatar(value);
                }}
            />
            <Toaster position="top-center" reverseOrder={false} />
            <Heading className="pt-6">Profile Setup</Heading>
            <div className="h-[192px] w-full flex items-center  justify-center rounded-[20px] overflow-hidden relative  my-10">
                <ImageEditor
                    getImageData={(data) => {
                        setImageData(data);
                    }}
                />
                {user?.image && (
                    <>
                        <div
                            onClick={() => {
                                setIsOpen(true);
                            }}
                            className="z-10 cursor-pointer hover:scale-105 transition-all rounded-full h-[120px] w-[120px] object-cover outline-dashed outline-2 outline-offset-2 outline-purple-500 avatar-box-shadow absolute left-10 p-1 overflow-hidden"
                        >
                            <img
                                src={
                                    chosenAvatar !== null
                                        ? getImage(chosenAvatar)
                                        : user?.image
                                }
                                alt="avatar_icon"
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                        {/* <div className="z-10 absolute right-8 top-8">
                            <img src={editIcon} alt="public" className="mr-2" />
                        </div> */}
                    </>
                )}
            </div>
            <div className="flex gap-4 cursor-pointer w-fit">
                <div
                    className={` font-normal py-2 px-4 rounded-full ${
                        activeState === 1
                            ? "bg-[#7D18C0] text-[#D9D9D9]"
                            : "text-[#7E768C] "
                    }`}
                    onClick={() => setActiveState(1)}
                >
                    <span>Settings</span>
                </div>
                <div
                    className={` font-normal py-2 px-4 rounded-full ${
                        activeState === 2
                            ? "bg-[#7D18C0] text-[#D9D9D9]"
                            : "text-[#7E768C] "
                    }`}
                    onClick={() => setActiveState(2)}
                >
                    <span>Games</span>
                </div>
            </div>
            {activeState === 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full h-full pb-10">
                    <div className="col-span-2 mt-12">
                        <div className="bg-[#22163A] rounded-xl h-full p-10">
                            <div className="pb-6 text-lg">Turf Id</div>
                            <div className="flex items-start justify-start relative">
                                <input
                                    className={`h-full w-11/12 border-1  ${
                                        apiState === "error"
                                            ? "focus:border-red-500 border-red-500"
                                            : "border-[#413055] focus:border-[#413055]"
                                    }  f`}
                                    value={
                                        turfId ? turfId : user?.turf_id || ""
                                    }
                                    onChange={(e) => {
                                        if (e.target.value.length >= 5) {
                                            setApiState("loading");
                                        }
                                        setTurfId(e.target.value);
                                    }}
                                />
                                {apiState === "loading" && (
                                    <div
                                        role="status"
                                        className="absolute left-[87%] top-3"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#7C40E4]"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 mb-5 text-[14px] text-red-500">
                                {userState}
                            </div>
                            <div className="mb-5">
                                <CheckBox
                                    checked={handleInputValidation(
                                        turfId
                                            ? turfId
                                            : user && user?.turf_id
                                            ? user?.turf_id
                                            : ""
                                    )}
                                    label={
                                        "Must be atleast 5 characters long and should not start or end with a special character"
                                    }
                                />
                            </div>
                            {userNameValues.length > 0 && (
                                <Suggestions
                                    heading="Suggestions"
                                    values={userNameValues}
                                    selectedValue={turfId}
                                    onValueChange={(value) => {
                                        setTurfId(value);
                                    }}
                                />
                            )}
                            <div className="pt-12 text-lg">Communities</div>
                            {inputFields.map((field, index) => {
                                return (
                                    <div
                                        className="flex gap-5 pt-6"
                                        key={index}
                                    >
                                        <img
                                            src={Profile_discrod}
                                            alt="dicord"
                                            className="flex items-center justify-center"
                                        />
                                        <div className="relative">
                                            <div className="absolute text-sm bottom-[75%] z-20 left-4 bg-[#22163A] text-[#7E768C] tracking-wide">
                                                name
                                            </div>
                                            <input
                                                className={`${
                                                    showBorderError &&
                                                    field.name === "" &&
                                                    "focus:border-red-500 border-red-500"
                                                } h-[40px] border-[#413055] focus:border-[#413055]`}
                                                value={field.name}
                                                onChange={(e) => {
                                                    const updatedFields = [
                                                        ...inputFields,
                                                    ];
                                                    updatedFields[index].name =
                                                        e.target.value;
                                                    setInputFields(
                                                        updatedFields
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="w-10/12 relative">
                                            <div className="absolute text-sm bottom-[75%] z-20 left-4 bg-[#22163A] text-[#7E768C] tracking-wide">
                                                community url
                                            </div>
                                            <input
                                                className={`${
                                                    showBorderError &&
                                                    field.url === "" &&
                                                    "focus:border-red-500 border-red-500"
                                                } h-[40px] border-[#413055] focus:border-[#413055]`}
                                                value={field.url}
                                                onChange={(e) => {
                                                    const updatedFields = [
                                                        ...inputFields,
                                                    ];
                                                    updatedFields[index].url =
                                                        e.target.value;
                                                    setInputFields(
                                                        updatedFields
                                                    );
                                                }}
                                            />
                                        </div>

                                        <div>
                                            {index ===
                                            inputFields.length - 1 ? (
                                                <AiOutlinePlusCircle
                                                    onClick={() => {
                                                        if (
                                                            field.name !== "" &&
                                                            field.url !== ""
                                                        ) {
                                                            handleAddField();
                                                        } else {
                                                            setShowBorderError(
                                                                true
                                                            );
                                                        }
                                                    }}
                                                    className="text-[#5a05c4] flex items-center mt-1 justify-center cursor-pointer"
                                                    size={33}
                                                />
                                            ) : (
                                                <AiOutlineCloseCircle
                                                    className="text-[#5a05c4] flex items-center mt-1 justify-center cursor-pointer"
                                                    onClick={() =>
                                                        handleRemoveField(index)
                                                    }
                                                    size={33}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="h-[90%]">
                        <div className="mt-12 bg-[#22163A] rounded-2xl px-6 py-5">
                            <div className="text-[#7E768C] text-sm">
                                Social handles
                            </div>

                            {user !== null &&
                            !socialsData?.discord &&
                            !user?.discord ? (
                                <div className="profile-socials-border rounded-xl text-sm p-5 my-10">
                                    <div className="flex justify-around items-center">
                                        <div className="bg-[#44306D] rounded-full p-3">
                                            <img
                                                src={discord_icon}
                                                alt="dicord"
                                                className="flex items-center"
                                            />
                                        </div>
                                        <div className="font-bold">Discord</div>
                                        <a
                                            className="cursor-pointer"
                                            href={IN_APP_DISCORD_URL}
                                        >
                                            <img
                                                src={discordBtn}
                                                height={120}
                                                width={120}
                                            />
                                        </a>
                                    </div>
                                </div>
                            ) : null}
                            <div className="profile-socials-border my-5 rounded-xl text-sm">
                                {user?.discord || socialsData?.discord ? (
                                    <div className="profile-socials-border-bottom">
                                        <div className="flex items-center justify-between mx-5 gap-2">
                                            <img
                                                src={Profile_discrod}
                                                alt="dicord"
                                                className="flex items-center"
                                            />
                                            <input
                                                className="border-transparent cursor-not-allowed focus:border-transparent"
                                                placeholder="discord handle"
                                                value={`${
                                                    socialsData.discord
                                                        ? socialsData.discord
                                                        : user?.discord || ""
                                                }`}
                                                onChange={(e) => {
                                                    setSocialsData(
                                                        (prevSocials) => ({
                                                            ...prevSocials,
                                                            discord:
                                                                e.target.value,
                                                        })
                                                    );
                                                }}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                ) : null}

                                <div className="profile-socials-border-bottom">
                                    <div className="flex items-center justify-between mx-5 gap-2">
                                        <img src={Youtube_Icon} alt="youtube" />
                                        <input
                                            className="border-transparent focus:border-transparent"
                                            placeholder="youtube handle"
                                            value={`${
                                                socialsData.youtube
                                                    ? socialsData.youtube
                                                    : user?.youtube || ""
                                            }`}
                                            onChange={(e) => {
                                                setSocialsData(
                                                    (prevSocials) => ({
                                                        ...prevSocials,
                                                        youtube: e.target.value,
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="profile-socials-border-bottom">
                                    <div className="flex items-center justify-between mx-5  gap-2">
                                        <img src={Telegram_Icon} alt="twitch" />
                                        <input
                                            className="border-transparent focus:border-transparent"
                                            placeholder={"telegram handle"}
                                            value={`${
                                                socialsData.telegram
                                                    ? socialsData.telegram
                                                    : user?.telegram || ""
                                            }`}
                                            onChange={(e) => {
                                                setSocialsData(
                                                    (prevSocials) => ({
                                                        ...prevSocials,
                                                        telegram:
                                                            e.target.value,
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mx-5  gap-2">
                                    <img src={TwitchIcon} alt="twitch" />
                                    <input
                                        className="border-transparent focus:border-transparent"
                                        value={`${
                                            socialsData.twitch
                                                ? socialsData.twitch
                                                : user?.twitch || ""
                                        }`}
                                        placeholder="twitch handle"
                                        onChange={(e) => {
                                            setSocialsData((prevSocials) => ({
                                                ...prevSocials,
                                                twitch: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <GamesSection gameData={gameData} setGameData={setGameData} />
            )}
            <div className="flex items-center justify-between pb-10">
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
                        <button
                            className={`text-[14px] px-3 text-[#FFF] ${
                                !handleInputValidation(
                                    turfId ? turfId : user?.turf_id || ""
                                ) || apiState === "error"
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}
                            onClick={() => {
                                if (activeState === 2) {
                                    handleAddGames();
                                } else {
                                    handleUpdateData();
                                }
                            }}
                            disabled={
                                !handleInputValidation(
                                    turfId ? turfId : user?.turf_id || ""
                                ) || apiState === "error"
                            }
                        >
                            Save changes
                        </button>
                        <img src={Arrow} alt="arrow" />
                    </motion.div>
                </AnimatePresence>
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
                        onClick={() => {
                            removeoAuthTokens();
                            removeAccessTokens();
                            dispatch(setInitialState());
                            navigate("/");
                        }}
                    >
                        <BiPowerOff size={20} className="text-[#5a05c4]" />
                        <div className="text-[14px] px-3 text-[#FFF]">
                            Logout
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Layout>
    );
};

export default Profile;
