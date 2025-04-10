/*
The Page to accept Approvals to exchange Shifts.
 */
import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Grid,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography
} from "@mui/material";
import '@schedule-x/theme-default/dist/index.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createViewMonthGrid} from "@schedule-x/calendar";
import dayjs from "dayjs";
import {leaveApi} from "../service/api.ts";
import {Leave, leaveStatus} from "../types/leave.ts";


const Approval: React.FC = ()=> {
    const [leaveRequests, setLeaveRequests] = useState<Leave[]>([]);


    useEffect(() => {
        ( async () => {
            try { // API TO GET LEAVE REQUESTS
                const response = await leaveApi.getAllLeaves();
                console.log("Leave Requests Fetched: ")
                console.log(response)
                setLeaveRequests([response.data]);
            } catch (error) {
                console.error("Failed to fetch leave requests:", error);
            }
        })();
    }, []);
    // Calendar
    const calendar = useCalendarApp({views: [createViewMonthGrid()]})
    // MUI Stuff
    const [activeTab, setActiveTab] = useState(0); // 0 for Leave requests, 1 for Shift Exchanges
    const handleTabChange = (_: React.SyntheticEvent, newValue: number)=>{setActiveTab(newValue)}

    // Filter for display purposes - only show pending requests in the UI
    const pendingLeaveRequests = leaveRequests.filter(req => req.status === "PENDING");


    return(

        <Box sx={{width: "100%", padding: "20px"}}>
            <Typography variant="h5" fontWeight="bold">Approval</Typography>
            <Grid container spacing={3} sx={{ height: "100vh" }}>
                <Grid item xs={7} md={8}>
                    <Paper sx={{ padding: 3, height: "100vh" }}>

                        <Tabs value={activeTab} onChange={handleTabChange}
                              sx={{
                                "& .MuiTab-root": {
                                fontWeight: "600",
                                fontSize: "16px",
                                textTransform: "none",
                                transition: "color 0.3s",

                            },
                        }}>
                            <Tab label="Leave Requests"  sx={{
                                color: activeTab === 0 ? "#2a85ed" : "black", // Active: Green, Inactive: Black
                                "&:hover": { backgroundColor: activeTab === 0 ? "#2a85ed" : "#f5f5f5" },
                            }}/>
                            <Tab label="Shift Exchanges" sx={{
                                color: activeTab === 1 ? "#2AED8D" : "black", // Active: Green, Inactive: Black
                                "&:hover": { backgroundColor: activeTab === 1 ? "#2AED8D44" : "#f5f5f5" },
                            }}/>
                        </Tabs>
                        {activeTab==0 && (
                            <Box className="leaveReqs" sx={{ marginTop: 2, marginRight: 3 }}>
                            <TableContainer>
                                <Table sx={{ width: "100%" }}>
                                   <TableHead sx={{ backgroundColor: "rgba(109,147,204,0.27)" }}>
                                        <TableRow>
                                            <TableCell>Shift Of Request</TableCell>
                                            <TableCell>Request Type</TableCell>
                                            <TableCell>Doctor</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                   </TableHead>
                                    <TableBody>
                                        {pendingLeaveRequests.length > 0 ? (
                                            pendingLeaveRequests.map((req, index) => (
                                                <TableRow key={index} sx={{ backgroundColor: "#ffffff" }}>
                                                    <TableCell>
                                                            {dayjs(req.shift.startTime).format("MMMM D, YYYY [at] h:mm A")}
                                                    </TableCell>
                                                    <TableCell>{req.type}</TableCell>
                                                    <TableCell>
                                                            {req.doctor.firstName.charAt(0)} {req.doctor.lastName}
                                                    </TableCell>
                                                    <TableCell>
                                                        <>
                                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                            <Button className="panel-btn" sx={{
                                                            backgroundColor: "#2AED8D !important",
                                                            "&:hover": {backgroundColor: "#28C77F!important",},
                                                            }} onClick={async () => {
                                                                try {
                                                                    setLeaveRequests((prev) => prev.map((lr) => lr.id === req.id
                                                                                        ? { ...lr, status: leaveStatus.APPROVED } : lr));
                                                                            const response = await leaveApi.approveLeave(req.id);
                                                                            console.log("Approved: ", response.data);
                                                                            setTimeout(() => {
                                                                                setLeaveRequests((prev) =>
                                                                                    prev.filter((lr) => lr.id !== req.id)
                                                                                );
                                                                            }, 1500);
                                                                        } catch (e) {
                                                                            console.error("Failed to approve leave request:", e);
                                                                            setLeaveRequests((prev) =>
                                                                                prev.map((lr) => lr.id === req.id ? { ...lr, status: leaveStatus.PENDING } : lr));}
                                                                    }}>Approve</Button>

                                                                <Button className="panel-btn" sx={{backgroundColor: "#f11717 !important",
                                                                    color: "#ffffff !important",
                                                                    "&:hover": {
                                                                    backgroundColor: "#f11717!important", },
                                                                }}
                                                                    onClick={async () => {
                                                                        try {
                                                                            setLeaveRequests((prev) => prev.map((lr) => lr.id === req.id ? { ...lr, status: leaveStatus.REJECTED } : lr)
                                                                            );
                                                                            const response = await leaveApi.rejectLeave(req.id);
                                                                            console.log("Rejected", response.data);
                                                                            setTimeout(() => {
                                                                                setLeaveRequests((prev) =>
                                                                                    prev.filter((lr) => lr.id !== req.id)
                                                                                );
                                                                            }, 1500);
                                                                        } catch (e) {
                                                                            console.error("Failed to reject leave request:", e);
                                                                            setLeaveRequests((prev) =>
                                                                                prev.map((lr) =>
                                                                                    lr.id === req.id
                                                                                        ? { ...lr, status: leaveStatus.PENDING }
                                                                                        : lr
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    Reject
                                                                </Button>
                                                            </Box>
                                                            </>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={4} align="center">
                                                        <Box sx={{ padding: 4, textAlign: "center", color: "#888" }}>
                                                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                                No Pending Leave Requests
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                Pending Requests Will Show Here
                                                            </Typography>
                                                        </Box>

                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>

                        )}
                        {activeTab==1 && (
                            <Box className="shiftExchanges" sx={{ marginTop: 2 , marginRight: 3}}>
                                <TableContainer>
                                    <Table sx={{ width: "100%" ,backgroundColor: "#2AED8D33"}}>
                                        <TableHead >
                                            <TableRow>
                                                <TableCell>Shift Of Request</TableCell>
                                                <TableCell>Exchange Shift</TableCell>
                                                <TableCell>Time Left</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow sx={{backgroundColor: "#ffffff"}}>
                                                <TableCell>03/02/2025 - 7 am to 1pm</TableCell>
                                                <TableCell>05/02/2025 - 1 pm to 7pm</TableCell>
                                                <TableCell>3 Days</TableCell>
                                                <TableCell>Pending</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )}
                    </Paper>
                </Grid>
                <Grid item  xs={3} md={4}>
                    <Box className="calendar" sx={{ marginTop: 2 }}>
                        <Typography variant="h6" fontWeight="bold">Personal Calendar</Typography>
                    <ScheduleXCalendar calendarApp={calendar}/>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}
export default Approval;