/*Main Dashboard
 Functionalities:
    Calendar: To View and Create Roster
    Form: To Assign Doctors to Shifts
 */
import React from "react";
import Calendar from "../Components/Calendar"; // Corrected import statement

interface DashboardProps {
    employeeType: "doctor" | "nurse";
}

const Dashboard: React.FC<DashboardProps> = ({employeeType}) => {
    return (
        <>
            <h1>{employeeType==="doctor"? "Doctor Dashboard":"Nurse Dashboard"}</h1>
            <Calendar employeeType={employeeType}/>
        </>
    );
};

export default Dashboard;
