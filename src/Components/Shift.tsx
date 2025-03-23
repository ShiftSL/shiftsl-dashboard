import React from "react";
import { Card, CardContent, Typography, Box, Avatar, Grid } from "@mui/material";
import doctordata from "../jsonfiles/doctors.json";
import { ShiftFormData } from "../Interfaces/Types.tsx";

interface ShiftProps {
    shift: ShiftFormData; // created an object called shift with the data passed by the shift form
}

const Shift: React.FC<ShiftProps> = ({ shift }) => {
    // Fetching the doctor using doctor Id from the array
    const assignedDoctors = shift.people.map((id) => doctordata.find((doctor) => doctor.id === id));

    return (
        <Card sx={{ width: "100%", maxWidth: 189, margin: "auto", boxShadow: 3, borderRadius: 2, backgroundColor:"#2AED8D"  }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {new Date(shift.start).toLocaleString()} - {new Date(shift.end).toLocaleString()}
                </Typography>

                <Box sx={{ marginTop: 2 }}>

                    <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        {assignedDoctors.map((doctor, index) =>
                            doctor ? (
                                <Grid item xs={6} key={doctor.id}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Avatar sx={{width: 30, height: 30, fontSize: "14px", bgcolor: "rgba(255,255,255,0.16)" }}>
                                            {doctor.first_name.charAt(0)}
                                        </Avatar>
                                        <Typography variant="body2" sx={{ fontSize: "13px" }}>
                                           {doctor.last_name}
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
