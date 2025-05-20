import LeadCountsCard from "./components/lead-counts-card";
import InProgressLeadsCounts from "./components/in-progress-leads-Counts";
import TodayTasks from "./components/today-tasks";
import React from "react";

const Dashboard: React.FC = () => {
    return (
        <React.Fragment>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <LeadCountsCard />
                <InProgressLeadsCounts />
            </div>
            <div>
                <TodayTasks />
            </div>
        </React.Fragment>
    );
}

export default Dashboard;