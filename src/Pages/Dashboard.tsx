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
        {/*    TODO: Ojitha = When the NavBar is open the Time Axis is hidden Fix that
                               Make the Page Dynamic Also Fix nav Bar when Collapsed*/}
        </>
    );
};

export default Dashboard;
