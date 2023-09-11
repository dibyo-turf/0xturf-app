import clsx from "clsx";
import React, { ComponentPropsWithRef, forwardRef, useState } from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import ExtendIcon from "../../assets/icons/extend.svg";
import Console from "../../assets/console.png";
import Sidebar from "./SideBar";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorageHook";

const Layout: React.FC<ComponentPropsWithRef<"div">> = forwardRef(
    ({ className, ...props }, ref) => {
        const { pathname } = useLocation();
        const [isExpanded, setIsExpanded] = useLocalStorage(
            "isExpanded",
            false
        );

        return (
            <div className="flex items-start justify-between">
                <motion.div
                    initial={{
                        width: isExpanded ? "200px" : "108px",
                        maxWidth: isExpanded ? "200px" : "108px",
                        minWidth: isExpanded ? "200px" : "108px",
                    }}
                    animate={{
                        width: isExpanded ? "200px" : "108px",
                        maxWidth: isExpanded ? "200px" : "108px",
                        minWidth: isExpanded ? "200px" : "108px",
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                    }}
                    className={clsx(
                        " border sticky top-0 left-0 border-[#1D1E26] border-l-0 border-t-0 border-b-0 h-screen hidden md:block"
                    )}
                    ref={ref}
                >
                    {/* <img
                        src={ExtendIcon}
                        onClick={() => {
                            setIsExpanded(!isExpanded)
                        }}
                        className="absolute right-[-5px] cursor-e-resize top-1/2 transform -translate-y-1/2"
                    /> */}
                    <Sidebar isExpanded={isExpanded} />
                </motion.div>
                <div className="w-full max-w-[1200px] min-h-screen mx-auto h-full px-6">
                    <Header />
                    {pathname === "/" && (
                        <img
                            src={Console}
                            className="absolute top-0 right-0 h-full"
                        />
                    )}
                    <div className="min-h-[85vh] w-full">{props.children}</div>
                </div>
            </div>
        );
    }
);

export default Layout;
