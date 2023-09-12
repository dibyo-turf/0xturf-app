import { RegistrationStepsContext } from "@/pages/register";
import { useRegisterMutation } from "@/redux/api/oAuth";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../button";
import { useAccount } from "wagmi";

const URI = `https://turf-assets-test.s3.ap-south-1.amazonaws.com/avatars/avatar1.png`;

export const getImage = (index: number) =>
    `https://turf-assets-test.s3.ap-south-1.amazonaws.com/avatars/avatar${index}.png`;

const ChooseAvatar = () => {
    const { setShowLoader, registrationData } = useContext(
        RegistrationStepsContext
    );
    const { address } = useAccount();
    const navigate = useNavigate();

    const [registerUser] = useRegisterMutation();
    const [selectedAvatar, setSelectedAvatar] = React.useState(0);

    return (
        <div className="w-full flex flex-col mt-3 justify-between">
            <div className="h-[350px] py-4">
                <div className="grid grid-cols-3 gap-4 h-full">
                    {[
                        ...Array.from({
                            length: 9,
                        }).fill(1),
                    ].map((item, index) => {
                        return (
                            <div
                                className={`w-[75px] h-[75px] overflow-hidden rounded-full mx-auto cursor-pointer ${
                                    selectedAvatar === index &&
                                    "selected-avatar-border "
                                }`}
                                key={index}
                            >
                                <img
                                    src={getImage(index + 1)}
                                    alt=""
                                    className="w-full h-full"
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 justify-between ">
                <Button
                    variant="primary"
                    className="w-full"
                    onClick={async () => {
                        try {
                            setShowLoader(true);
                            const game_preferences = registrationData.games.map(
                                (game) => {
                                    return game.id;
                                }
                            );
                            await registerUser({
                                address: address,
                                turfId: registrationData.turfId,
                                image: getImage(selectedAvatar),
                            }).unwrap();
                            setShowLoader(false);
                            navigate("/");
                        } catch (error) {
                            setShowLoader(false);
                        }
                    }}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};
export default ChooseAvatar;
