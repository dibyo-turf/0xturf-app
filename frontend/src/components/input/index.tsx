import clsxm from "../../lib/clsxm";
import React, { ComponentProps, forwardRef } from "react";
import "./input.scss";

export const Input = forwardRef<
    HTMLInputElement,
    ComponentProps<"input"> & {
        label: string;
        id: string;
        apiState: string;
    }
>(({ className, id, label, value, apiState, ...rest }, ref) => {
    return (
        <div className="relative group">
            <input
                // className={clsxm("input_field", className)}
                className={`${
                    apiState === "error" && " group-focus-within:border-red-600"
                } ${clsxm("input_field", className)}`}
                ref={ref}
                value={value}
                id={id}
                placeholder={label}
                {...rest}
            />
            <label
                htmlFor={id}
                className={`input_label ${
                    apiState === "error"
                        ? "group-focus-within:text-red-500"
                        : "group-focus-within:text-[#7C40E4]"
                } `}
            >
                {label}
            </label>
        </div>
    );
});

export default Input;
{
    /* <div className="form__group">
<input id="email" className="form__field" placeholder="Your Email" />
<label htmlFor="email" className="form__label">
  Enter turf id
</label>
</div> */
}
