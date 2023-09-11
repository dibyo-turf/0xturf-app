import { RegistrationStepsContext } from "../../../pages/register";
import React, { ComponentProps, useContext, useEffect, useState } from "react";
import Button from "../../button";
import clsxm from "../../../lib/clsxm";
import Input from "../../input";
import CheckIcon from "../../../assets/icons/check_icon.svg";
import { useDebounce } from "usehooks-ts";
import { useAppDispatch } from "@/redux/hooks";
import { gamesApi } from "@/redux/api/games";
export const handleInputValidation = (str: string): boolean => {
    const specialCharPattern = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]*$/;
    if (str.length < 5) {
        return false;
    }
    if (
        specialCharPattern.test(str.charAt(0)) &&
        !specialCharPattern.test(str.charAt(str.length - 1))
    ) {
        return false;
    }

    if (
        !specialCharPattern.test(str.charAt(0)) &&
        specialCharPattern.test(str.charAt(str.length - 1))
    ) {
        return false;
    }

    return true;
};
const Identity = () => {
    const {
        setCurrentStep,
        currentStep,
        registrationData,
        setRegistrationData,
    } = useContext(RegistrationStepsContext);
    const dispatch = useAppDispatch();
    const [apiState, setApiState] = useState<
        "none" | "loading" | "success" | "error"
    >("none");
    const [userState, setUserState] = useState("");
    const [userNameValues, setUserNameValues] = useState<string[]>([]);

    const debouncedValue = useDebounce<string>(registrationData.turfId, 500);
    const handleVerifyApi = async () => {
        if (debouncedValue.length < 5) return;
        try {
            const data = await dispatch(
                gamesApi.endpoints.searchUsers.initiate({
                    query_value: debouncedValue,
                })
            ).unwrap();
            if (data.user === null) {
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
    useEffect(() => {
        handleVerifyApi();
    }, [debouncedValue]);
    return (
        <form
            className="mt-2 w-full "
            onSubmit={(e) => {
                e.preventDefault();
                setCurrentStep(currentStep + 1);
            }}
        >
            <div className="h-[20px]" />
            <div className="relative">
                <Input
                    label={`${
                        apiState === "error" ? userState : "Enter Turf-ID"
                    }`}
                    id="turfId"
                    value={registrationData.turfId}
                    apiState={apiState}
                    onChange={(e) => {
                        if (e.target.value.length >= 5) {
                            setApiState("loading");
                        }
                        handleInputValidation(registrationData.turfId);
                        setRegistrationData({
                            ...registrationData,
                            turfId: e.target.value,
                        });
                    }}
                />
                {apiState === "loading" && (
                    <div role="status" className="absolute top-4 right-1">
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

            <div className="mb-4" />

            <CheckBox
                checked={
                    registrationData.turfId.length >= 5 &&
                    handleInputValidation(registrationData.turfId)
                }
                label={
                    "Must be atleast 5 characters long and should not start or end with a special character"
                }
            />

            <div className="h-[20px]" />
            {userNameValues.length > 0 && (
                <Suggestions
                    heading="Suggestions"
                    values={userNameValues}
                    selectedValue={registrationData.turfId}
                    onValueChange={(value) => {
                        setRegistrationData({
                            ...registrationData,
                            turfId: value,
                        });
                    }}
                />
            )}

            <Button
                type="submit"
                variant="primary"
                disabled={
                    !handleInputValidation(registrationData.turfId) ||
                    apiState !== "success"
                }
                className="w-[90%] absolute bottom-6"
            >
                Continue
            </Button>
        </form>
    );
};

export default Identity;

export const CheckBox = ({
    checked,
    label,
}: {
    checked: boolean;
    label: string;
}) => {
    return (
        <div className="flex items-center justify-start space-x-3">
            <div
                className={clsxm(
                    `${
                        window.location.pathname === "/profile"
                            ? "w-[20px] "
                            : "w-[35px] "
                    }flex items-center justify-center h-[20px] border border-white border-opacity-20 rounded-md`,
                    checked && "border-none bg-[#7C40E4]"
                )}
            >
                {checked && <img src={CheckIcon} alt="check_icon" />}
            </div>
            <p className={clsxm("font-semibold text-[#696f7a] ")}>{label}</p>
        </div>
    );
};

export const Suggestions = ({
    heading,
    values,
    selectedValue,
    onValueChange,
}: {
    heading: string;
    values: string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
}) => {
    return (
        <div className="w-full ">
            <p className="text-[#4D535E] font-semibold my-3">{heading}</p>
            <div className="flex items-center justify-start no-scrollbar overflow-x-scroll wrap space-x-3">
                {values.map((value, index) => (
                    <Suggestion
                        key={index}
                        name={value}
                        selected={value === selectedValue}
                        onClick={() => {
                            onValueChange(value);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export const Suggestion: React.FC<
    ComponentProps<"div"> & {
        name: string;
        selected: boolean;
    }
> = ({ name, selected, ...props }) => {
    return (
        <div
            className={clsxm(
                "suggestion cursor-pointer",
                selected ? "selected" : "unselected"
            )}
            {...props}
        >
            {name}
        </div>
    );
};
