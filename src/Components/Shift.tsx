import React from "react";
import { Card, CardContent, Typography, Box, Avatar, Grid } from "@mui/material";
import doctordata from "../jsonfiles/doctors.json";
import nursedata from "../jsonfiles/nurses.json";
import { ShiftFormData } from "../Interfaces/Types.tsx";

interface ShiftProps {
    shift: ShiftFormData; // created an object called shift with the data passed by the shift form
    employeeType: "doctor" | "nurse";
}

const Shift: React.FC<ShiftProps> = ({ shift,employeeType }) => {
    //select data according to the employee type
    const employeedata = employeeType === "doctor" ? doctordata : nursedata;
    // Fetching the doctor using doctor Id from the array
    const assignedEmployees = shift.people.map((id) => employeedata.find((employee) => employee.id === id))
    .filter((employee)=>employee !== undefined) ;

    return (
        <Card sx={{ width: "100%", maxWidth: 189, margin: "auto", boxShadow: 3, borderRadius: 2, backgroundColor:"#2AED8D"  }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {new Date(shift.start).toLocaleString()} - {new Date(shift.end).toLocaleString()}
                </Typography>

                <Box sx={{ marginTop: 2 }}>

                    <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        {assignedEmployees.map((employee, index) =>
                            employee ? (
                                <Grid item xs={6} key={employee.id}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Avatar sx={{width: 30, height: 30, fontSize: "14px", bgcolor: "rgba(255,255,255,0.16)" }}>
                                            {employee.first_name.charAt(0)}
                                        </Avatar>
                                        <Typography variant="body2" sx={{ fontSize: "13px" }}>
                                           {employee.last_name}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ) : null
                        )}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Shift;
