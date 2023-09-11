/* eslint-disable react-hooks/exhaustive-deps */
import clsxm from "@/lib/clsxm";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { TbExternalLink } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import VALO from "../../assets/Valorant.png";
import ChevleftIcon from "../../assets/icons/chevleft.svg";
import ChevrightIcon from "../../assets/icons/chevright.svg";
import Level1 from "../../assets/icons/level1.svg";
import Level2 from "../../assets/icons/level2.svg";
import Level3 from "../../assets/icons/level3.svg";
import Level4 from "../../assets/icons/level4.svg";
import Level5 from "../../assets/icons/level5.svg";
import SearchIconGray from "../../assets/icons/search_icon_gray.svg";
import LOL from "../../assets/lol.jpeg";
import { Option } from "../menu";
import { TurfLeaderboardUsers } from "../sections/leaderboard/makeData";
import Heading from "../typography/Heading";
import "./table.css";

function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const Badges = [
    {
        name: "rookie",
        image: Level1,
        description: "All the users joining the platform, get the ROOKIE badge",
    },
    {
        name: "pioneer",
        image: Level2,
        description: "Badge provided to the early adopters of turf platform",
    },
    {
        name: "gamer",
        image: Level3,
        description:
            "Badge Provided to gamer after adding games on the platform.",
    },
    {
        name: "veteran",
        image: Level4,
        description:
            "Badge provided to gamer with having turf-XP in 1 to 500 range.",
    },
    {
        name: "elite",
        image: Level5,
        description:
            "Badge provided to gamer with having turf-XP in 500 and above range.",
    },
];

const levels = [Level1, Level2, Level3, Level4];

const GamerUrl =
    "https://img.freepik.com/premium-vector/gamer-streamer-mascot-logo-vector-illustration_382438-609.jpg";
const page_size = 5;

declare module "@tanstack/table-core" {
    interface FilterFns {
        fuzzy: FilterFn<unknown>;
    }
    interface FilterMeta {
        itemRank: RankingInfo;
    }
}

function Table({
    data,
    columns,
}: {
    data: TurfLeaderboardUsers[];
    columns: ColumnDef<TurfLeaderboardUsers>[];
}) {
    const menuOptions = [
        {
            id: "1",
            name: "NW",
            value: "turfexp",
        },
        {
            id: "2",
            name: "SE",
            value: "turfexp",
        },
    ];
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value);
        addMeta({
            itemRank,
        });
        return itemRank.passed;
    };

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: false,
        initialState: {
            pagination: {
                pageSize: page_size,
            },
        },
    });
    const totalPage = Math.ceil(data.length / page_size);
    const navigate = useNavigate();
    const ll = 5;
    return (
        <div>
            <div className="flex items-center justify-between">
                <Heading>Score Board</Heading>
                <div className="flex items-center justify-end">
                    {/* <Menu
                        selectedOption={selectedOption}
                        setSelectedOption={(newvalue) =>
                            setSelectedOption(newvalue)
                        }
                        menuoptions={menuOptions}
                        enableToggle
                        triggerButton={
                            <div className="text-[#7C7C88] inline-flex justify-end">
                                <img
                                    src={FilterIcon}
                                    className="w-6 h-6 mr-2"
                                />
                                Filter
                            </div>
                        }
                    /> */}
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className="p-2 font-lg shadow border border-block"
                        placeholder="Search all columns..."
                    />
                </div>
            </div>
            <div className="mt-10">
                <div className="w-full bg-[#1E1432] bg-opacity-60 p-3 px-6 rounded-[20px]   ">
                    <table className="w-full">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        className={clsxm(
                                                            "text-left text-[#A5A5A5] truncate py-2 px-4 text-[14px]  font-bold",
                                                            header.id ===
                                                                "turfId"
                                                                ? "max-w-[120px] min-w-[120px]"
                                                                : ""
                                                        )}
                                                    >
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                        {/* {header.column.getCanFilter() ? (
                                                            <div>
                                                                <Filter
                                                                    column={
                                                                        header.column
                                                                    }
                                                                    table={
                                                                        table
                                                                    }
                                                                />
                                                            </div>
                                                        ) : null} */}
                                                    </div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row, index) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            const id = cell.id.split("_")[1];
                                            let jsx = null;

                                            if (id === `rank`) {
                                                jsx = (
                                                    <span className="text-[#70797B]">
                                                        {
                                                            cell.row.original
                                                                .rank_id
                                                        }
                                                    </span>
                                                );
                                            } else if (id === "turfId") {
                                                jsx = (
                                                    <div
                                                        className="flex-1 flex items-center min-w-[300px]"
                                                        onClick={() => {
                                                            navigate(
                                                                "/portfolio?gamer=" +
                                                                    cell.row
                                                                        .original
                                                                        .turf_id
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                row.original
                                                                    .image
                                                            }
                                                            className="w-[30px]  rounded-full shrink-0 h-[30px]"
                                                            alt="Gamer"
                                                        />
                                                        <h1 className="leading-[22px] break-keep w-[300px] space-x-2 flex items-center justify-start hover:underline cursor-pointer text-[14px] ml-2 font-semibold">
                                                            {cell.row.original.turf_id.replace(
                                                                ".turf",
                                                                ""
                                                            )}
                                                            .turf &nbsp;
                                                            <TbExternalLink />
                                                        </h1>
                                                    </div>
                                                );
                                            } else if (id === "tier") {
                                                jsx = (
                                                    <div className="flex items-center justify-start text-[14px]  font-bold">
                                                        <div className="flex items-center space-x-2 justify-center">
                                                            {/* <div className="w-[25px]  h-[25px]  rounded-full overflow-hidden">
                                                                <img
                                                                    src={VALO}
                                                                    className="w-full h-full"
                                                                    alt="VALO"
                                                                />
                                                            </div> */}
                                                            {cell.row.original
                                                                .games.length >
                                                            0 ? (
                                                                <div className="w-[25px] ml-4  h-[25px]  rounded-full overflow-hidden">
                                                                    <img
                                                                        src={
                                                                            LOL
                                                                        }
                                                                        className="w-full h-full"
                                                                        alt="LOL"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="ml-4">
                                                                    N/A
                                                                </div>
                                                            )}
                                                        </div>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </div>
                                                );
                                            } else if (id === "turfxp") {
                                                jsx = (
                                                    <div className="flex items-center  text-sm justify-start font-bold">
                                                        {" "}
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}{" "}
                                                        turf-XP
                                                    </div>
                                                );
                                            } else if (id === "achievements") {
                                                jsx = (
                                                    <div className="flex items-center justify-start w-full text-sm font-bold">
                                                        {cell.row.original.badges.map(
                                                            (
                                                                badge: {
                                                                    name: string;
                                                                },
                                                                index: number
                                                            ) => (
                                                                <Badge
                                                                    index={
                                                                        index
                                                                    }
                                                                    key={index}
                                                                    badge_id={
                                                                        badge.name
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                );
                                            } else {
                                                jsx = flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                );
                                            }

                                            return (
                                                <td
                                                    key={cell.id}
                                                    className={clsxm(
                                                        "text-[#A5A5A5]",
                                                        cell.id.split(
                                                            "_"
                                                        )[1] === `turfId`
                                                            ? " min-w-[120px]  max-w-[100px]"
                                                            : ""
                                                    )}
                                                >
                                                    <div
                                                        className={clsxm(
                                                            "flex  h-[35px] items-center px-4 justify-start",
                                                            cell.id.split(
                                                                "_"
                                                            )[1] === `turfId`
                                                                ? " min-w-[100px]  max-w-[100px]"
                                                                : ""
                                                        )}
                                                    >
                                                        {jsx}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {data.length > 5 && (
                    <div className="flex mt-5 items-center justify-center py-5 gap-2">
                        {/* <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button> */}
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <img
                                src={ChevleftIcon}
                                className="w-[24px] h-[24px] cursor-pointer"
                            />
                        </button>
                        {Array.from({ length: totalPage }).map((_, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        table.setPageIndex(index);
                                    }}
                                    className={clsxm(
                                        "mx-4 cursor-pointer  font-bold",
                                        table.getState().pagination
                                            .pageIndex === index
                                            ? "text-[#7500FF]"
                                            : "text-[#768192]"
                                    )}
                                >
                                    {index + 1}
                                </div>
                            );
                        })}
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <img
                                src={ChevrightIcon}
                                className="w-[24px] h-[24px] cursor-pointer"
                            />
                        </button>
                        {/* <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button> */}
                        {/* <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span> */}
                        {/* <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span> */}
                        {/* <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Table;

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className="w-[264px] flex relative bg-[#1D1829] rounded-2xl">
            <div className="absolute top-3 pl-5">
                <img src={SearchIconGray} alt="search_icon" />
            </div>
            <input
                {...props}
                className="pl-[56px] text-sm leading-5 rounded-2xl border-none  text-[#7C7C88] placeholder:text-[#7C7C88] focus:outline-none h-[48px] focus:ring-0"
                placeholder="Search gamers..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export const Badge = ({
    badge_id,
    index,
}: {
    badge_id: string;
    index: number;
}) => {
    if (!badge_id) return null;
    const badge = Badges.filter(
        (a) => a.name.toLocaleLowerCase() === badge_id.toLocaleLowerCase()
    )[0];
    if (!badge) return null;

    return (
        <div>
            <Tooltip
                id={`achievements + ${index}`}
                place="top"
                style={{
                    backgroundColor: "#7500FF",
                    color: "#fff",
                    fontWeight: 400,
                    borderRadius: "10px",
                    maxWidth: "250px",
                    textAlign: "center",
                    opacity: 1,
                }}
            />
            <img
                data-tooltip-id={`achievements + ${index}`}
                data-tooltip-content={
                    badge.name.toUpperCase() +
                    " " +
                    "-" +
                    " " +
                    badge.description
                }
                src={badge.image}
                className="w-[25px] cursor-pointer mr-2 h-[25px]"
            />
        </div>
    );
};
