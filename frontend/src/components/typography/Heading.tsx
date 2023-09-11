import clsxm from "@/lib/clsxm";
import React, { ComponentProps } from "react";

const Heading: React.FC<ComponentProps<"h1">> = ({ className, ...props }) => {
    const classNames = clsxm(
        `text-[#C1C1C1] leading-[40px] tracking-[0.3px] text-[18px] uppercase audio-wide ${className}`
    );
    return <h1 className={classNames} {...props} />;
};

export default Heading;
