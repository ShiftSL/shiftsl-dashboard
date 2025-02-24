import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import CreateAccount from "./Pages/CreateAccount";
import Navbar from "./Components/Navbar";

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent: React.FC = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/login" && location.pathname !== "/create-account" && <Navbar />}
            <Box sx={{ display: "flex" }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create-account" element={<CreateAccount />} /> {/* Add route for CreateAccount */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
};

export default App;