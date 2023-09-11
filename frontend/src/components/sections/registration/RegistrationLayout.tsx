import { motion } from "framer-motion";
import React, { useState } from "react";
import clsxm from "../../../lib/clsxm";
import Logo from "../../logo/index";
import "./registration_layout.css";

const IMAGES_LENGTH = 6;
const imagesClasses = Array.from({
    length: IMAGES_LENGTH,
}).map((d, i) => "image_".concat(`${i + 1}`));

const RegistrationLayout: React.FC<React.ComponentPropsWithRef<"div">> = ({
    children,
}) => {
    const [imageIndex, setImageIndex] = useState(
        Math.floor(Math.random() * (IMAGES_LENGTH - 1 + 1)) >= 8
            ? 0
            : Math.floor(Math.random() * (IMAGES_LENGTH - 1 + 1))
    );

    return (
        <div className={clsxm("layout")}>
            <div className="w-fit z-20 ml-10">
                <Logo />
            </div>
            <motion.div
                key={imageIndex}
                initial={{
                    opacity: 0,
                }}
                transition={{
                    duration: 5,
                    ease: "easeOut",
                }}
                exit={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                onAnimationComplete={() =>
                    setImageIndex(
                        imageIndex == imagesClasses.length - 1
                            ? 0
                            : imageIndex + 1
                    )
                }
                className={clsxm(
                    "absolute top-0 h-full w-full",
                    imagesClasses[imageIndex]
                )}
            />

            <div className="flex justify-end w-full">
                <div className="form_section">
                    <div className="w-[380px] relative h-[550px] flex justify-center ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationLayout;
