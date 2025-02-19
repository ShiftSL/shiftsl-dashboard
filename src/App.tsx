import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "./Pages/Dashboard.tsx";
import Navbar from "./Components/Navbar.tsx";


const App: React.FC = () => {
    return (
        <Router>
            {/*<Navbar/>*/}
            <Box sx={{ display: "flex" }}>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />

                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
