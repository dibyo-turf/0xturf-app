import { User } from "@/redux/api/oAuth/types";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import discordImage from "../../assets/icons/discordHeaderIcon.svg";
import shareImage from "../../assets/icons/shareHeaderIcon.svg";
import youtubeImage from "../../assets/icons/youtubeHeaderIcon.svg";
import { BASE_URL } from "@/config";
import { Toaster, toast } from "react-hot-toast";
import clsxm from "@/lib/clsxm";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectWalletButton } from "../ConnectButton";

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

const UserAvatar = ({ user }: { user: User }) => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            {/* {user && <Socials user={user} />} */}
            <div className="mr-4">
                <ConnectWalletButton />
            </div>
            <AnimatePresence>
                {user && (
                    <Link to={`/profile`}>
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="flex items-center justify-center "
                        >
                            <div className="w-[48px] h-[48px] overflow-hidden rounded-full">
                                <img
                                    src={user.image}
                                    className="w-[48px] h-[48px] bg-[#0A0914] rounded-[16px] flex items-center justify-center"
                                />
                            </div>
                            <div className="ml-4">
                                <p className="text-white font-bold text-sm">
                                    {user.turf_id.replace(".turf", "") +
                                        ".turf"}
                                </p>
                                <div className="flex items-center space-x-1 mt-1 justify-start">
                                    <div className="w-[8px] h-[8px] bg-[#A8F63C] rounded-full"></div>
                                    <p className="text-[#768192]  text-xs">
                                        Online
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                )}
            </AnimatePresence>
        </>
    );
};

export default UserAvatar;

const Socials = ({ user }: { user: User }) => {
    const socials = [
        {
            id: "share",
            imageUrl: shareImage,
            isDisabled: false,
            link: "",
        },
        {
            id: "discord",
            imageUrl: discordImage,
            isDisabled: false,
            link: "",
        },
        {
            id: "youtube",
            isDisabled: false,
            imageUrl: youtubeImage,
            link: "",
        },
    ].map((data) => {
        if (user?.discord && data.id === "discord") {
            return {
                ...data,
                link: `https://discord.com/channels/@me`,
            };
        } else if (user?.youtube && data.id === "youtube") {
            return {
                ...data,
                link: `https://youtube.com/${user?.youtube}`,
            };
        } else if (data.id === "share") {
            return {
                ...data,
                link: `${BASE_URL}/portfolio?gamer=${user?.turf_id}`,
            };
        } else {
            return {
                ...data,
                isDisabled: true,
            };
        }
    });
    return (
        <>
            {window.location.pathname !== "/" && (
                <>
                    <div className="relative border-[1px] border-[#1D1E26] rounded-lg flex gap-4">
                        {socials.map((elem, index) => {
                            if (!elem) return;
                            if (elem.link && elem.id !== "share") {
                                return (
                                    <a
                                        role="link"
                                        aria-disabled={elem.isDisabled}
                                        href={elem.isDisabled ? "#" : elem.link}
                                        key={index}
                                        target="#blank"
                                        className={clsxm(
                                            elem.isDisabled
                                                ? "cursor-not-allowed pointer-events-none"
                                                : "cursor-pointer"
                                        )}
                                    >
                                        <img
                                            key={index}
                                            src={elem.imageUrl}
                                            alt="social_images"
                                            className={clsxm(
                                                "w-[22px] h-[22px] m-3",
                                                elem.isDisabled
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                            )}
                                        />
                                    </a>
                                );
                            } else {
                                return (
                                    <img
                                        key={index}
                                        onClick={() => {
                                            if (elem.id === "share") {
                                                navigator.clipboard.writeText(
                                                    elem.link
                                                );
                                                toast.success(
                                                    "Link copied to clipboard",
                                                    toastStyles
                                                );
                                            }
                                        }}
                                        src={elem.imageUrl}
                                        alt="social_images"
                                        className={clsxm(
                                            "w-[22px] h-[22px] m-3",
                                            elem.isDisabled
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                        )}
                                    />
                                );
                            }
                        })}
                        <div className="w-[24px] absolute top-[22px] left-[40px] h-[1px] bg-line rotate-90"></div>
                        <div className="w-[24px] absolute top-[22px] left-[100px] h-[1px] bg-line rotate-90"></div>
                    </div>
                    <div className="w-[24px] h-[1px] mx-2 bg-line rotate-90"></div>
                </>
            )}
        </>
    );
};
