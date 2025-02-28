import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import AssignDoctorForm from "./Components/AssignDoctorForm";
import Header from "./Components/Header";
import Employees from "./Pages/Employees.tsx"; // Import Header component
import Header from "./Components/Header"; 
import LoginPage from "./Pages/LoginPage"; 

const App: React.FC = () => {
    return (
        <Router>
            <Box sx={{ display: "flex" }}>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Header /> {/* Add Header component */}
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                        <Route path="/employees" element={<Employees/>}/>
                    </Routes>
                </Box>
            </Box>
            <AppContent />
        </Router>
    );
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <Box sx={{ display: "flex" }}>
            {!isLoginPage && <Navbar />}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {!isLoginPage && <Header />} {/* Conditionally render Header */}
                <Routes>
                    <Route path="/login" element={<LoginPage />} /> {/* Add LoginPage route */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to LoginPage */}
                </Routes>
            </Box>
        </Box>
    );
};

export default App;
