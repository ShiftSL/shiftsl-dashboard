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
            <Calendar/>
        </>
    );
};

export default Dashboard;
