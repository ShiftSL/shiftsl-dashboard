/*Main Dashboard
 Functionalities:
    Calendar: To View and Create Roster
    Form: To Assign Doctors to Shifts
 */
import React from "react";
import Calendar from "../Components/Calendar"; // Corrected import statement

const Dashboard: React.FC = () => {
    return (
        <>
            <h1>Dashboard</h1>
            <Calendar/>
        </>
    );
};

export default Dashboard;
