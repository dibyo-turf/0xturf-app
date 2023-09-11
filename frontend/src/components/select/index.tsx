import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import clsxm from "../../lib/clsxm";
import { useDebounce } from "usehooks-ts";
import { useAppDispatch } from "@/redux/hooks";
import { gamesApi } from "@/redux/api/games";
import { Game } from "@/redux/api/games/types";
import { ImSpinner2 } from "react-icons/im";

export default function Select({
    disabled,
    setSelectedGames,
}: {
    disabled: boolean;
    setSelectedGames: (value: Game) => void;
}) {
    const [selected, setSelected] = useState<Game>({
        id: "1",
        name: "",
        banner: ''
    });
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const [apiState, setApiState] = useState<
        "none" | "loading" | "success" | "error"
    >("none");
    const [data, setData] = useState<Game[]>([]);

    const debouncedValue = useDebounce<string>(query, 500);
    const fetchData = async () => {
        if (debouncedValue.length < 3) return;

        try {
            const data = await dispatch(
                gamesApi.endpoints.searchGames.initiate({
                    query_value: debouncedValue,
                })
            ).unwrap();
            if (data.length > 0) {
                setApiState("success");
            } else {
                setApiState("none");
            }
            setData(data);
        } catch (error) {
            setApiState("error");
        }
    };
    useEffect(() => {
        fetchData();
    }, [debouncedValue]);
    return (
        <div className="w-full group">
            <Combobox
                value={selected}
                onChange={(data) => {
                    setQuery(data.name);
                    setSelected(data);
                    if (!disabled) {
                        setSelectedGames(data);
                    }
                }}
            >
                <div className="relative mt-1">
                    <div className="relative w-full group">
                        <div className="absolute top-1 left-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="absolute top-[11px] group-focus-within:text-[#7C40E4] text-[#757575] w-5 h-5 left-0 ml-2"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <Combobox.Input
                            id="games"
                            className={clsxm(
                                "input_field pl-[36px] group-focus-within:border-[#7C40E4]"
                            )}
                            placeholder="Search games"
                            value={query}
                            // displayValue={(data: typeof selected) => data?.name}
                            onChange={(event) => {
                                if (event.target.value.length >= 3) {
                                    setApiState("loading");
                                }
                                setQuery(event.target.value);
                            }}
                        />
                        <label
                            htmlFor="games"
                            className="input_label_2 group-focus-within:text-[#7C40E4] group-focus-within:top-[-9px] group-focus-within:left-[10px] group-focus-within:text-[12px]"
                        >
                            Search games
                        </label>
                    </div>
                    {query.length >= 3 && (
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Combobox.Options className="absolute mt-2 max-h-60 w-full card_bg border-none shadow-select_panel overflow-auto rounded-[8px] text-base  ring-1 ring-[#7C40E4] focus:outline-none sm:text-sm">
                                {apiState === "none" && (
                                    <div className="flex items-center h-[100px] w-full justify-center">
                                        No games found
                                    </div>
                                )}
                                {apiState === "success" &&
                                    data.length > 0 &&
                                    data.map((elem, index) => (
                                        <Combobox.Option
                                            key={index}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-3 px-4 ${active
                                                    ? "bg-[#7C40E4] bg-opacity-20 text-white"
                                                    : "text-[#757575]"
                                                }`
                                            }
                                            value={elem}
                                        >
                                            {({ selected, active }) => (
                                                <div className="flex space-x-2 items-center">
                                                    <div className="w-[20px] h-[20px] overflow-hidden rounded-full">
                                                        <img src={elem.banner} alt="Elem" className="h-full w-full" />
                                                    </div>
                                                    <span
                                                        className={`block truncate ${selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                            }`}
                                                    >
                                                        {elem.name}
                                                    </span>
                                                </div>
                                            )}
                                        </Combobox.Option>
                                    ))}
                                {apiState === "loading" && (
                                    <div className="flex items-center h-[100px] w-full justify-center">
                                        <div className="animate-spin">
                                            <ImSpinner2 size={20} />
                                        </div>
                                    </div>
                                )}
                                {apiState === "error" && (
                                    <div className="flex items-center h-[100px] w-full justify-center">
                                        Something went wrong :
                                    </div>
                                )}
                            </Combobox.Options>
                        </Transition>
                    )}
                </div>
            </Combobox>
        </div>
    );
}
