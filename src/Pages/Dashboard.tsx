/*Main Dashboard
 Functionalities:
    Calendar: To View and Create Roster
    Form: To Assign Doctors to Shifts
 */
import React, { Profiler, ProfilerOnRenderCallback } from "react";
import Calendar from "../Components/Calendar";

const onRenderCallback: (id: string,
                         phase: "mount" | "update" | "nested-update",
                         actualDuration: number,
                         baseDuration: number,
                         startTime: number,
                         commitTime: number,
                         interactions: Set<unknown>) => void = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
) => {
    console.log(
        `[Profiler] ${id} (${phase}) - Rendered in ${actualDuration.toFixed(2)}ms`
    );
};

const Dashboard: React.FC = () => {
    return (
        <>
            <Profiler id="Calendar" onRender={onRenderCallback as (id: string, phase: ("mount" | "update" | "nested-update"), actualDuration: number, baseDuration: number, startTime: number, commitTime: number) => void}>
                <Calendar />
            </Profiler>
        </>
    );
};

export default Dashboard;


