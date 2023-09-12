import React, { ComponentProps, useEffect, useState } from "react";
import { DiscordAuthLink, GoogleAuthLink } from "../../components/links";
import Layout from "../../components/sections/registration/RegistrationLayout";
import clsxm from "../../lib/clsxm";

import QrCodeModal from "@/components/modal/QrCodeModal";
import { HTMLMotionProps, motion } from "framer-motion";
import BackArrow from "../../assets/icons/back_arrow.svg";
import { ConnectWalletButton } from "@/components/ConnectButton";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { address } = useAccount();

    // useEffect(() => {
    //     if (address) {
    //         navigate("/register");
    //     }
    // }, [address]);

    return (
        <Layout>
            <QrCodeModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <Card
                title="Welcome Gamer's"
                subtitle="Ready to show off your skills and earn while you play? Start by creating your turf profile and sharing it with your friends, join amazing communities and get ready to incentivise your talent."
                showTerms
                className="absolute top-0 z-40 w-full "
            >
                <div className="flex flex-col h-[350px]  mt-10 space-y-6">
                    <ConnectWalletButton />
                    <DiscordAuthLink />
                    <GoogleAuthLink />
                </div>
            </Card>
            <Card className="absolute top-[15px] z-30 w-[90%]" />
            <Card className="absolute  top-[25px] z-20 w-[80%]" />
        </Layout>
    );
};

export default SignIn;

export const Card: React.FC<
    HTMLMotionProps<"div"> & {
        showTerms?: boolean;
        title?: string;
        subtitle?: string;
    } & {
        children?: React.ReactNode;
    }
> = ({ className, title, subtitle, children, ...rest }) => {
    return (
        <motion.div
            className={clsxm(
                "pt-3  px-5 flex flex-col card_bg  rounded-[8px] justify-between  mx-auto h-full",
                className
            )}
            {...rest}
        >
            <div className="h-full ">
                {title && <h1 className="mt-2">{title}</h1>}
                {subtitle && <p>{subtitle}</p>}
                {children}
            </div>
            {/* {showTerms && (
                <p className="text-center mb-4">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a>Privacy Policy</a> & <a>Terms of Service</a> apply.
                </p>
            )} */}
        </motion.div>
    );
};

export const BackButton: React.FC<ComponentProps<"button">> = ({ ...rest }) => {
    return (
        <button
            className="card_bg rounded-full pl-1 pr-3 flex items-center justify-start space-x-1 py-2 absolute -top-12 left-0"
            {...rest}
        >
            <img src={BackArrow} alt="back_arrow" />

            <p className="text-white">back</p>
        </button>
    );
};
