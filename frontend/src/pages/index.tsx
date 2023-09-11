import Layout from "../components/sections/registration/RegistrationLayout";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import TurfImage from "../assets/turf_image.png";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <motion.div
            key={"i"}
            initial={{
                opacity: 0,
            }}
            transition={{
                duration: 1,
            }}
            animate={{
                opacity: 1,
            }}
            className="min-h-screen  bg-[#01040F] w-full flex flex-col justify-center items-center"
        >
            <img
                src={TurfImage}
                alt="TurfImage"
                className="w-[180px] animate-spin-slow h-[180px]"
            />
        </motion.div>
    );
};

export default Home;
