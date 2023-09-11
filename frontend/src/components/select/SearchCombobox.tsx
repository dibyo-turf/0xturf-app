import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import clsxm from "@/lib/clsxm";
import { useDebounce } from "usehooks-ts";
import { useAppDispatch } from "@/redux/hooks";
import { searchApi } from "@/redux/api/search";
import { ImSpinner2 } from "react-icons/im";
import { GlobalSearchResponse } from "@/redux/api/search/types";
import crossIcon from "../../assets/icons/cross_icon.svg";
import searchIcon from "../../assets/icons/search_icon.svg";
import searchIconGray from "../../assets/icons/search_icon_gray.svg";
import { TbExternalLink } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/redux/api/user";
import { UserSearchResponse } from "@/redux/api/user/types";
export default function SearchCombobox({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) {
    const [selected, setSelected] = useState("");
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const [apiState, setApiState] = useState<
        "none" | "loading" | "error" | "success"
    >("none");
    const debouncedValue = useDebounce<string>(query, 500);
    const [data, setData] = useState<GlobalSearchResponse>([]);
    const isDashboardSceen = window.location.pathname === "/";
    const navigate = useNavigate();
    const fetchData = async () => {
        if (debouncedValue.length < 3) {
            setData([]);
            setApiState("none");
            return;
        }
        try {
            const data = await dispatch(
                userApi.endpoints.searchUser.initiate(
                    {
                        query_value: debouncedValue,
                    },
                    {
                        forceRefetch: true,
                    }
                )
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);
    return (
        <div className={`${isDashboardSceen ? "w-[635px]" : "w-[435px]"} z-20`}>
            <Combobox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <div className="relative mt-1">
                        <OpenTrayDetector
                            isOpen={open}
                            setIsOpen={setIsOpen}
                            query={query}
                        />
                        <div
                            className={clsxm(
                                "relative w-full",
                                "cursor-default",
                                "overflow-hidden",
                                `${
                                    isDashboardSceen
                                        ? "rounded-lg"
                                        : "rounded-2xl"
                                }`,
                                "bg-[#251F30] ",
                                "text-left",
                                "focus:outline-none sm:text-sm"
                            )}
                        >
                            {isDashboardSceen ? (
                                <>
                                    <Combobox.Input
                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-[#7C7C88] placeholder:text-[#7C7C88] focus:outline-none h-[48px] focus:ring-0"
                                        displayValue={() => query}
                                        placeholder={"Search gamers.."}
                                        onChange={(event) => {
                                            if (
                                                event.target.value.length >= 3
                                            ) {
                                                setApiState("loading");
                                            }
                                            setQuery(event.target.value);
                                        }}
                                    />
                                    <Combobox.Button
                                        className="absolute inset-y-0 right-1 flex items-center pr-2"
                                        onClick={() => {
                                            if (query.length >= 3) {
                                                setQuery("");
                                            }
                                        }}
                                    >
                                        {query.length >= 3 ? (
                                            <img
                                                src={crossIcon}
                                                alt="crossIcon"
                                            />
                                        ) : (
                                            <img
                                                src={searchIcon}
                                                alt="searchIcon"
                                            />
                                        )}
                                    </Combobox.Button>
                                </>
                            ) : (
                                <div className="flex pl-5">
                                    <Combobox.Button
                                        className=" inset-y-0 flex items-center"
                                        onClick={() => {
                                            if (query.length >= 3) {
                                                setQuery("");
                                            }
                                        }}
                                    >
                                        <img
                                            src={searchIconGray}
                                            alt="search_icon"
                                        />
                                    </Combobox.Button>
                                    <Combobox.Input
                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-[#7C7C88] placeholder:text-[#7C7C88] focus:outline-none h-[48px] focus:ring-0"
                                        displayValue={() => query}
                                        placeholder={"Search gamers..."}
                                        onChange={(event) => {
                                            if (
                                                event.target.value.length >= 3
                                            ) {
                                                setApiState("loading");
                                            }
                                            setQuery(event.target.value);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        {query.length >= 3 && (
                            <Transition
                                as={Fragment}
                                show={open}
                                enter="transition-opacity duration-75"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Combobox.Options
                                    className={`absolute mt-2 max-h-96 w-full overflow-auto ${
                                        isDashboardSceen
                                            ? "rounded-lg"
                                            : "rounded-2xl"
                                    } bg-[#251F30] text-base  focus:outline-none sm:text-sm`}
                                >
                                    {apiState === "none" &&
                                        data.length === 0 && (
                                            <div
                                                className={`flex items-center ${
                                                    isDashboardSceen
                                                        ? "h-[300px] "
                                                        : "h-[100px] "
                                                }w-full justify-center`}
                                            >
                                                No results found
                                            </div>
                                        )}
                                    {apiState === "success" &&
                                        data.map((searchData, dataIndex) => {
                                            return (
                                                <Fragment key={dataIndex}>
                                                    <Combobox.Option
                                                        key={dataIndex}
                                                        className={({
                                                            active,
                                                        }) =>
                                                            `relative cursor-pointer select-none py-2 pl-7 pr-4 ${
                                                                active &&
                                                                "bg-[#16121e] bg-opacity-60"
                                                            } text-white`
                                                        }
                                                        value={searchData}
                                                    >
                                                        {({ selected }) => (
                                                            <div
                                                                className="flex justify-between items-center"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/portfolio?gamer=${searchData.name}`
                                                                    )
                                                                }
                                                            >
                                                                <div className="flex">
                                                                    {searchData.imgUrl ? (
                                                                        <div className="w-[35px] h-[35px] bg-black overflow-hidden rounded-full">
                                                                            <img
                                                                                src={
                                                                                    searchData.imgUrl
                                                                                }
                                                                                alt="people_img"
                                                                                height={
                                                                                    35
                                                                                }
                                                                                width={
                                                                                    35
                                                                                }
                                                                                className="rounded-full object-cover overflow-hidden"
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="w-[35px] h-[35px] bg-black rounded-full"></div>
                                                                    )}
                                                                    <span
                                                                        className={`text-[#7C7C88] block truncate pl-3 my-auto ${
                                                                            selected
                                                                                ? "font-medium"
                                                                                : "font-normal"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            searchData.name
                                                                        }
                                                                        .turf
                                                                    </span>
                                                                </div>
                                                                <div className="">
                                                                    <TbExternalLink color="#7500FF" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Combobox.Option>
                                                </Fragment>
                                            );
                                        })}
                                    {apiState === "loading" && (
                                        <div
                                            className={`flex items-center ${
                                                isDashboardSceen
                                                    ? "h-[300px]"
                                                    : "h-[100px]"
                                            }  w-full justify-center`}
                                        >
                                            <div className="animate-spin">
                                                <ImSpinner2 size={20} />
                                            </div>
                                        </div>
                                    )}
                                    {apiState === "error" && (
                                        <div
                                            className={`flex items-center ${
                                                isDashboardSceen
                                                    ? "h-[300px]"
                                                    : "h-[100px]"
                                            }  w-full justify-center`}
                                        >
                                            Something went wrong :(
                                        </div>
                                    )}
                                </Combobox.Options>
                            </Transition>
                        )}
                    </div>
                )}
            </Combobox>
        </div>
    );
}

const OpenTrayDetector = ({
    isOpen,
    query,
    setIsOpen,
}: {
    isOpen: boolean;
    query: string;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    React.useEffect(() => {
        if (query.length >= 3) {
            setIsOpen(isOpen);
        } else {
            setIsOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, query]);

    return null;
};
