import React from "react";
import DashboardCharacter from "../../../assets/dashboard_character.png";
import DualSensei from "../../../assets/sensei.png";
import Likes from "../../../assets/icons/likes.svg";
import Views from "../../../assets/icons/views.svg";
import Share from "../../../assets/icons/share.svg";
import Joystick from "../../../assets/icons/joystick.svg";
import Arrow from "../../../assets/icons/arrow.svg";
import LeftArrow from "../../../assets/left_arrow.svg";
import RightArrow from "../../../assets/right_arrow.svg";
import SearchCombobox from "@/components/select/SearchCombobox";
import Button from "@/components/button";
import { AnimatePresence, motion } from "framer-motion";
const DashboardSection = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="pt-2 flex flex-col justify-between relative h-[85vh]">
            <h1 className="text-[#C1C1C1] text-center leading-[50px] tracking-[0.5px] text-[32px] audio-wide uppercase">
                Welcome Gamers
            </h1>
            <div className="flex w-full items-center justify-center">
                <SearchCombobox setIsOpen={setIsOpen} />
            </div>
            <div className="flex items-end  relative justify-center ">
                <AnimatePresence>

                    {!isOpen && (
                        <>
                            {/* <motion.div
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
                                className="w-[182px] h-[108px] bg-[#0A0914] p-4 card rounded-[10px] absolute left-10 top-0"
                            >
                                <img
                                    src={Joystick}
                                    className="w-[24px] h-[24px]"
                                    alt="Joystick"
                                />
                                <div className="mt-3 text-[14px]">
                                    Top
                                    <br />
                                    Communities
                                </div>
                                <div>
                                    <img
                                        src={Arrow}
                                        alt="arrow"
                                        className="w-[25px] h-[25px] absolute bottom-3 right-10"
                                    />
                                </div>
                            </motion.div> */}
                            {/* <motion.div
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
                                }} className="w-[182px] h-[108px] bg-[#0A0914] p-4 card rounded-[10px] absolute right-0 top-20">
                                <img
                                    src={Joystick}
                                    className="w-[24px] h-[24px]"
                                    alt="Joystick"
                                />
                                <div className="mt-3 text-[14px]">
                                    Top
                                    <br />
                                    Games Added
                                </div>
                                <div>
                                    <img
                                        src={Arrow}
                                        alt="arrow"
                                        className="w-[25px] h-[25px] absolute bottom-3 right-10"
                                    />
                                </div>
                            </motion.div> */}
                            {/* <motion.div
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
                                className="absolute left-60 top-20">
                                <img src={LeftArrow} className="" />
                            </motion.div> */}
                            {/* <motion.div
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
                                }} className="flex items-end justify-center space-x-4 absolute left-1/2 -translate-x-1/2 bottom-4">
                                <div className="w-[110px] h-[130px] bg-[#0A0914] overflow-hidden main_character rounded-[10px]">
                                    <img
                                        src={DualSensei}
                                        alt=""
                                        className="w-[110px] h-[130px]"
                                    />
                                </div>
                                <div className="w-[630px] bg-[#1A1F3F] px-6 py-3 bg-opacity-[44%] bg-sensei bg-cover h-[130px] rounded-[10px]">
                                    <h3 className="text-[16px]">Dual Sensei</h3>
                                    <p className="text-[#DAD7D7] leading-[22px] text-[14px] mt-1 tracking-[-4%]">
                                        Mauris blandit aliquet elit, eget tincidunt
                                        nibh pulvinar a. Donec rutrum congue leo
                                        eget malesuada. Vivamus magna justo.
                                    </p>
                                    <div className="flex items-center justify-start space-x-4">
                                        <div className="flex items-center mt-2 ">
                                            <img
                                                src={Likes}
                                                alt=""
                                                className="w-[24px] h-[24px] rounded-full"
                                            />
                                            <p className="text-[#A8A8A8] leading-[19.07px] ml-1 text-sm">
                                                100k
                                            </p>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <img
                                                src={Views}
                                                alt=""
                                                className="w-[24px] h-[24px] rounded-full"
                                            />
                                            <p className="text-[#A8A8A8] leading-[19.07px] ml-1 text-sm">
                                                100k
                                            </p>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <img
                                                src={Share}
                                                alt=""
                                                className="w-[24px] h-[24px] rounded-full"
                                            />
                                            <p className="text-[#A8A8A8] leading-[19.07px] ml-1 text-sm">
                                                100k
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Button>Play&nbsp;now</Button>
                            </motion.div> */}
                            {/* <motion.div initial={{
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
                                }} className="absolute right-56 top-20">
                                <img src={RightArrow} className="" />
                            </motion.div> */}
                            {/* <motion.div
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
                                }} className="flex items-end justify-center space-x-4 absolute left-1/2 -translate-x-1/2 bottom-4">
                                <div className="w-[110px] h-[130px] bg-[#0A0914] overflow-hidden main_character rounded-[10px]">
                                    <img
                                        src={DualSensei}
                                        alt=""
                                        className="w-[110px] h-[130px]"
                                    />
                                </div>
                                <div className="w-[630px] bg-[#1A1F3F] px-6 py-3 bg-opacity-[44%] bg-sensei bg-cover h-[130px] rounded-[10px]">
                                    <h3 className="text-[16px]">Dual Sensei</h3>
                                    <p className="text-[#DAD7D7] leading-[22px] text-[14px] mt-1 tracking-[-4%]">
                                        Mauris blandit aliquet elit, eget tincidunt
                                        nibh pulvinar a. Donec rutrum congue leo
                                        eget malesuada. Vivamus magna justo.
                                    </p>
                                    <div className="flex items-center justify-start space-x-4">
                                        <div className="flex items-center mt-2 ">
                                            <img
                                                src={Likes}
                                                alt=""
                                                className="w-[24px] h-[24px] rounded-full"
                                            />
                                            <p className="text-[#A8A8A8] leading-[19.07px] ml-1 text-sm">
                                                100k
                                            </p>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <img
                                                src={Views}
                                                alt=""
                                                className="w-[24px] h-[24px] rounded-full"
                                            />
                                            <p className="text-[#A8A8A8] leading-[19.07px] ml-1 text-sm">
                                                100k
                                            </p>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <img
                                                src={Share}
                                                alt=""
                                                className="w-[24px] h-[24px] rounded-full"
                                            />
                                            <p className="text-[#A8A8A8] leading-[19.07px] ml-1 text-sm">
                                                100k
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Button>Play&nbsp;now</Button>
                            </motion.div> */}
                        </>
                    )}
                </AnimatePresence>

                <img
                    src={DashboardCharacter}
                    alt="character"
                    className="w-[680px] h-[405px]"
                />
            </div>
        </div>
    );
};

export default DashboardSection;
