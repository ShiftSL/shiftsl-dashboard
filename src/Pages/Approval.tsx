/*
The Page to accept Approvals to exchange Shifts.
 */
import React, {useEffect, useState} from "react";
import {
    Box, Button,
    Grid,
    Paper,
    Tab,
    Table, TableBody,
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
import axios from "axios";

const Approval: React.FC = ()=> {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try { // API TO GET LEAVE REQUESTS
                const response = await leaveApi.getAllLeaves();
                console.log(response)
                setLeaveRequests(response.data);
            } catch (error) {
                console.error("Failed to fetch leave requests:", error);
            }
        };

        fetchLeaveRequests();
    }, []);
    // Calendar
    const calendar = useCalendarApp({views: [createViewMonthGrid()]})
    // MUI Stuff
    const [activeTab, setActiveTab] = useState(0); // 0 for Leave requests, 1 for Shift Exchanges
    const handleTabChange = (event: React.SyntheticEvent, newValue: number)=>{setActiveTab(newValue)}
    // const handleDecision = async (leaveId: number, action: "APPROVE" | "REJECT") => {
    //     try {
    //         const endpoint =
    //             action === "APPROVE"
    //                 ? `/api/leave/approve/${leaveId}`
    //                 : `/api/leave/reject/${leaveId}`;
    //
    //         await axios.put(endpoint);
    //
    //         // Update the local state
    //         setLeaveRequests(prev =>
    //             prev.map(req =>
    //                 req.id === leaveId
    //                     ? { ...req, status: action === "APPROVE" ? "APPROVED" : "REJECTED" }
    //                     : req
    //             )
    //         );
    //     } catch (error) {
    //         console.error(`Failed to ${action.toLowerCase()} leave request:`, error);
    //     }
    // };

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
                            <Box className="leaveReqs" sx={{ marginTop: 2 , marginRight: 3}}>
                                <TableContainer>
                                    <Table sx={{ width: "100%" }}>
                                    <TableHead sx={{backgroundColor: "rgba(109,147,204,0.27)"}}>
                                        <TableRow>
                                            <TableCell>Shift Of Request</TableCell>
                                            <TableCell>Request Type</TableCell>
                                            <TableCell>Doctor</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leaveRequests.map((req, index) => (
                                            <TableRow key={index} sx={{ backgroundColor: "#ffffff" }}>
                                                <TableCell>{dayjs(req.shift.startTime).format("MMMM D, YYYY [at] h:mm A")}</TableCell>
                                                <TableCell>{req.type}</TableCell>
                                                <TableCell>{req.doctor.firstName.charAt(0)}  {req.doctor.lastName}</TableCell>
                                                <TableCell> {req.status === "PENDING" ? (
                                                    <>
                                                        <Button className="panel-btn" sx={{
                                                            backgroundColor: "#2AED8D !important",
                                                            "&:hover": {
                                                                backgroundColor: "#28C77F!important",
                                                            },
                                                        }}> Approve </Button>

                                                        <Button className="panel-btn" sx={{
                                                            backgroundColor: "#f11717 !important",
                                                            color: "#ffffff !important",
                                                            "&:hover": {
                                                                backgroundColor: "#f11717!important",
                                                            },
                                                        }}> Reject </Button>
                                                    </>
                                                ) : (
                                                    req.status
                                                )}</TableCell>
                                            </TableRow>
                                        ))}
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
                        {/*Indicator Box*/}
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-begin", marginTop: 2, gap: 3,}}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={{ width: 12, height: 12, backgroundColor: "#2E86C1" }} />
                                <Typography fontSize="14px">Approved</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={{ width: 12, height: 12, backgroundColor: "#E74C3C" }} />
                                <Typography fontSize="14px">Rejected</Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={{ width: 12, height: 12, backgroundColor: "#F1C40F" }} />
                                <Typography fontSize="14px">Pending</Typography>
                            </Box>
                        </Box>



                    </Paper>
                </Grid>
                <Grid item  xs={3} md={4}>
                    <Box className="calendar" sx={{ marginTop: 2 }}>
                        <Typography variant="h8" fontWeight="bold">Personal Calendar</Typography>
                    <ScheduleXCalendar calendarApp={calendar}/>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}
export default Approval;