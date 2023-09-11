import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { makeData, TurfLeaderboardUsers } from "./makeData";
import Table from "@/components/table";
import Heading from "@/components/typography/Heading";
import Menu, { Option } from "@/components/menu";
import { useGetLeaderBoardGamesQuery } from "@/redux/api/games";
const LeaderBoardTable = () => {
    const columns = React.useMemo<ColumnDef<TurfLeaderboardUsers>[]>(
        () => [
            {
                accessorKey: "rank_id",
                id: "rank",
                cell: (info) => info.getValue(),
                size: 5000,
                header: () => <span>Rank</span>,
            },
            {
                accessorKey: "turf_id",
                id: "turfId",
                cell: (info) => info.getValue(),
                header: () => <span>Turf Id</span>,
            },

            {
                accessorKey: "tier",
                id: "tier",
                header: () => <span>Games</span>,
            },

            {
                accessorKey: "turf_xp",
                id: "turfxp",
                header: () => <span>Turfs</span>,
            },
            {
                accessorKey: "acheivement",
                id: "achievements",
                header: () => <span>Achievement</span>,
            },
        ],
        []
    );


    const { data, isSuccess } = useGetLeaderBoardGamesQuery()

    return (
        <div className="my-10 w-full">

            {data &&
                // @ts-ignore
                <Table
                    {...{
                        data: data.slice(6, data.length - 1),
                        columns,
                    }}
                />
            }
        </div>
    );
};

export default LeaderBoardTable;
