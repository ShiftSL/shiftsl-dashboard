import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import AssignDoctorForm from "./Components/AssignDoctorForm";
import Header from "./Components/Header"; 
import LoginPage from "./Pages/LoginPage"; 
import SuccessPage from "./Pages/SuccessPage"; 
import VerificationPage from "./Pages/VerificationPage"; 

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login" || location.pathname === "/success-page" || location.pathname === "/verification-page";

    return (
        <Box sx={{ display: "flex" }}>
            {!isLoginPage && <Navbar />}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {!isLoginPage && <Header />} 
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/success-page" element={<SuccessPage />} /> 
                    <Route path="/verification-page" element={<VerificationPage />} /> 
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/login" />} /> 
                </Routes>
            </Box>
        </Box>
    );
};

export default App;
