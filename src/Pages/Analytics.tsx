import React from 'react';
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface DoctorShiftData {
    name: string;
    coveredShifts: number;
    coveredHours: number;
    leavesTaken: number;
    hoursRemaining: number;
}
 interface AnalyticsProps {
    doctorsAnalytics: DoctorShiftData[];
} 
const Analytics:React.FC<AnalyticsProps>= ({ doctorsAnalytics }) => {
  return (
    <Box>
      {doctorsAnalytics.map((doctor, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{doctor.name}</Typography>
            <Accordion>
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
                <Typography >View Analytics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">Covered Shifts: {doctor.coveredShifts}</Typography>
                <Typography variant="body2">Covered Hours: {doctor.coveredHours}</Typography>
                <Typography variant="body2">Leaves Taken: {doctor.leavesTaken}</Typography>
                <Typography variant="body2">
                  Hours Remaining: {doctor.hoursRemaining}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Analytics;