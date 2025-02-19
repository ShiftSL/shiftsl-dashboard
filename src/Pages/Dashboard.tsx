/*Main Dashboard
 Functionalities:
    Calendar: To View and Create Roster
    Form: To Assign Doctors to Shifts
 */
import React from "react";
import Navbar from "../Components/Navbar";
import Calendar from "../Components/Calendar.tsx"; // Import Navbar

const Dashboard: React.FC = () => {
    return (
        <>
            {/*<Navbar /> /!* Use the Navbar component here *!/*/}
            <Calendar/>
        {/*    TODO: Ojitha = When the NavBar is open the Time Axis is hidden Fix that
                               Make the Page Dynamic Also Fix nav Bar when Collapsed*/}
        </>
    );
};

export default Dashboard;
