import React, { useState,useEffect } from 'react';
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Box,TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Doctor } from '../Interfaces/Doctor';
import doctorsData from '../jsonfiles/doctors.json';

const Analytics:React.FC= () => {
    const [search, setSearch] = useState(""); //handle search input
    const [doctors, setDoctors] = useState<Doctor[]>([]); //hold doctor data
    const [shiftData, setShiftData] = useState<any[]>([]); //hold shift data
    const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]); //hold filtered doctor data including shift data

   useEffect(() => {
        const convertedDoctors=doctorsData.map((doctor) => ({ //convert doctor id to bigint
            ...doctor,
            id: BigInt(doctor.id),
        }));
        setDoctors(convertedDoctors);
        setShiftData(shiftData);
    },[]);


    //filter doctors based on search input
    useEffect    (() => {
    const filtered=doctors.filter((doctor) =>{
        const fullName= `${doctor.first_name} ${doctor.last_name}`.toLowerCase().trim();
        const query=search.toLowerCase().trim();
        return fullName.includes(query);
    }
    );
    setFilteredDoctors(filtered);
    },[search,doctors]);


    //merge doctor data with shift data
    const mergedDoctors=filteredDoctors.map((doctor) => {
        const doctorShift=shiftData.find((shift) => shift.doctor_id === doctor.id);
        
        console.log(`Doctor ID: ${doctor.id}`);
        console.log(`Shift Data: ${JSON.stringify(doctorShift)}`);

        const merged={...doctor, ...doctorShift, 
            coveredShifts: doctorShift?.coveredShifts || 0,
            coveredHours: doctorShift?.coveredHours || 0,
            leavesTaken: doctorShift?.leavesTaken || 0,
            hoursRemaining: doctorShift?.hoursRemaining || 0
        };
    
        console.log("Merged Doctor Data:", merged);
        console.log(merged);
        return merged;
    });

  return (
    <Box>
        <Typography variant="h4" gutterBottom>Doctor Analytics</Typography>
        <TextField
            label="Search Doctor"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ marginBottom: "3" }}
       />
        /*TODO: 1. Make sure to hide the other doctors when searching and only show the searched doctor
                2. Instead of the Accordions use a Card and Display the data in a bar graph. Malindu will send the design
        */

       {mergedDoctors.length === 0? (
        <Typography>No doctors found</Typography>):(
        mergedDoctors.map((doctor, index) => (
            <Accordion key={index}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{backgroundColor: "rgba(42, 237, 141, 0.1)",
                        "&:hover": { 
                            backgroundColor: "rgba(42, 237, 141, 0.2)",},
                        "&.Mui-expanded": {
                            backgroundColor: "rgba(42, 237, 141, 0.3)",},
                        }}
                >
                    <Typography>{doctor.first_name} {doctor.last_name} - View Analytics </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant="body2">Covered Shifts: {doctor.coveredShifts}</Typography>
                <Typography variant="body2">Covered Hours: {doctor.coveredHours}</Typography>
                <Typography variant="body2">Leaves Taken: {doctor.leavesTaken}</Typography>
                <Typography variant="body2">Hours Remaining: {doctor.hoursRemaining} </Typography>
                </AccordionDetails> 
                </Accordion>
        ))
    )}
    </Box>
  );
};

export default Analytics;