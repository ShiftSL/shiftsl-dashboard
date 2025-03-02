import React from "react";
import AssignNurseForm from "../Components/AssignNurseForm";
import NurseCalender from "../Components/NurseCalender";
import AddNurse from "../Components/AddNurse";

const NursesDashboard: React.FC = () => {
    // const handleNurseAdded = (nurseData: any) => {
    //     console.log("Nurse added:", nurseData);
    // };
    // // Handler for form submission
    // const handleSubmit = (formData: any) => {
    //     console.log("Nurse assigned:", formData);
    // };

    // // Handler for form cancellation
    // const handleCancel = () => {
    //     console.log("Nurse assignment canceled");
    // };
    return (
        <div>
            <h1>Nurse Dashboard</h1>
            {/* <AssignNurseForm onSubmit={handleSubmit} onCancel={handleCancel} /> */}

            <NurseCalender/>
            {/* <AddNurse onNurseAdded={handleNurseAdded} /> */}
        </div>
    );
};
export default NursesDashboard;