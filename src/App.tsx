import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import Dashboard from "./Pages/Dashboard.tsx";
import Navbar from "./Components/Navbar.tsx";
import AssignDoctorForm from "./Components/AssignDoctorForm.tsx";



const App: React.FC = () => {
    return (
        <Router>

            <Box sx={{ display: "flex" }}>


const AppContent: React.FC = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/login" && <Navbar />}
            <Box sx={{ display: "flex" }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
};

export default App;