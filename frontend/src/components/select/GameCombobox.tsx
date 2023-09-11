import React, { useContext, useState } from "react";
import Select from ".";
import CancelSvg from "../../assets/icons/cancel.svg";
import { RegistrationStepsContext } from "@/pages/register";

const GameCombobox = () => {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const { registrationData, setRegistrationData } = useContext(RegistrationStepsContext)
  return (
    <div>
      <Select
        disabled={registrationData.games.length > 3}
        setSelectedGames={(value) => {
          if (registrationData.games.find(game => game.name.toLowerCase() === value.name.toLowerCase())) {
            setRegistrationData({
              ...registrationData,
              games: registrationData.games.filter(game => game.name.toLocaleLowerCase() !== value.name.toLocaleLowerCase()),
            });
            return;
          }
          setRegistrationData({
            ...registrationData,
            games: [...registrationData.games, value],
          });
        }}
      />
      <div className="mt-4">
        {selectedGames.length > 0 && <p>Selected Games</p>}
        <div className="w-full mt-3  flex gap-2 flex-wrap items-center">
          {registrationData.games.map((value, index) => (
            <div
              key={index}
              onClick={() => {
                if (registrationData.games.includes(value)) {
                  setRegistrationData({
                    ...registrationData,
                    games: registrationData.games.filter(game => game !== value),
                  });
                  return;
                }
                setRegistrationData({
                  ...registrationData,
                  games: [...registrationData.games, value],
                });
              }}
              className="px-3 py-3 suggestion selected flex items-center justify-between space-x-3"
            >
              {value.name}
              <img
                src={CancelSvg}
                alt="cancel"
                className="ml-2"
                onClick={() => {
                  setSelectedGames(
                    selectedGames.filter(
                      (game) =>
                        game.toLocaleLowerCase() !== value.name.toLocaleLowerCase()
                    )
                  );
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCombobox;
