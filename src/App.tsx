import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import AssignDoctorForm from "./Components/AssignDoctorForm";
import Header from "./Components/Header"; 
import LoginPage from "./Pages/LoginPage"; 
import CreateAccount from "./Pages/CreateAccount"; 
import ForgotPassword from "./Pages/ForgotPassword"; 

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login" || location.pathname === "/create-account" || location.pathname === "/forgot-password";

    return (
        <Box sx={{ display: "flex" }}>
            {!isLoginPage && <Navbar />}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {!isLoginPage && <Header />} {/* Conditionally render Header */}
                <Routes>
                    <Route path="/login" element={<LoginPage />} /> {/* Add LoginPage route */}
                    <Route path="/create-account" element={<CreateAccount />} /> {/* Add CreateAccount route */}
                    <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add ForgotPassword route */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to LoginPage */}
                </Routes>
            </Box>
        </Box>
    );
};

export default App;
