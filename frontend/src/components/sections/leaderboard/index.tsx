import React from "react";

import LeaderBoardTable from "./LeaderBoardTable";

import LeaderBoardStats from "./LeaderBoardStats";

const LeaderboardSection = () => {
    return (
        <div className="mt-10">
            <LeaderBoardStats />
            <LeaderBoardTable />
        </div>
    );
};

export default LeaderboardSection;
