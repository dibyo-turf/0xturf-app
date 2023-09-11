import React, { useContext, useState } from "react";
import { RegistrationStepsContext } from "../../../pages/register";
import Button from "../../button";
import "./games.scss";
import clsxm from "../../../lib/clsxm";
import GameCombobox from "../../select/GameCombobox";
import { Suggestion } from "./Identity";
import Games from "../../../assets/games.json"


const ChooseTurf = () => {
    const { setCurrentStep, currentStep, registrationData, setRegistrationData } = useContext(
        RegistrationStepsContext
    );

    return (
        <div className="w-full flex flex-col mt-3 justify-between">
            <div className="">
                <GameCombobox />
            </div>
            <Suggestions
                values={Games.slice(0, 3).map(game => game.name)}
                heading="Popular Games"
                selectedValue={registrationData.games.map(game => { return game.name })}
                onValueChange={(value) => {
                    if (registrationData.games.find(game => game.name.toLowerCase() === value.toLowerCase())) {
                        setRegistrationData({
                            ...registrationData,
                            games: registrationData.games.filter(game => game.name.toLocaleLowerCase() !== value.toLocaleLowerCase()),
                        });
                        return;
                    }
                    const gg = Games.find(game => game.name.toLocaleLowerCase() === value.toLocaleLowerCase())
                    if (gg) {
                        const ss = [...registrationData.games, { id: gg.id, name: value }]
                        setRegistrationData({
                            ...registrationData,
                            games: ss,
                        });
                    }
                }}
            />
            <div className="flex items-center absolute bottom-4 w-[90%] justify-between ">
                {/* <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                        setCurrentStep(currentStep + 1);
                    }}
                >
                    Skip for now
                </Button> */}
                <Button
                    variant="primary"
                    className="w-full"
                    disabled={registrationData.games.length === 0}
                    onClick={() => {
                        setCurrentStep(currentStep + 1);
                    }}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default ChooseTurf;

export const Game = ({
    gameIcon,
    title,
}: {
    gameIcon: string;
    title: string;
}) => {
    const [selected, setSelected] = useState(false);
    return (
        <div className={"w-[125px]"}>
            <div
                className={clsxm("game", selected && "selected")}
                onClick={() => {
                    setSelected(!selected);
                }}
            >
                <img src={gameIcon} title="WOW" className="w-[60px] h-[60px]" />
            </div>
            <p className="text-center w-[90%] mt-3 text-[14px] mx-auto">
                {title}
            </p>
        </div>
    );
};


const Suggestions = ({
    heading,
    values,
    selectedValue,
    onValueChange,
}: {
    heading: string;
    values: string[];
    selectedValue: string[];
    onValueChange: (value: string) => void;
}) => {
    return (
        <div className="w-full ">
            <p className="text-[#4D535E] font-semibold my-3">{heading}</p>
            <div className="w-full mt-3  flex gap-2 flex-wrap items-center">
                {values.map(
                    (value, index) => (
                        <Suggestion
                            key={index}
                            name={value}
                            selected={selectedValue.includes(value)}
                            onClick={() => {
                                onValueChange(value);
                            }}
                        />
                    )
                )}
            </div>
        </div>
    );
};