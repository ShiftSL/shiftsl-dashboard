import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import Employees from "./Pages/Employees";
import Approval from "./Pages/Approval";
import LoginPage from "./Pages/login";
import ForgotPasswordPage from "./Pages/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
import Future from "./Pages/future.tsx";

// Custom Theme
const theme = createTheme({
  palette: {
    primary: { main: "#2b3c56" },
    secondary: { main: "#459257" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: "8px" },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#2b3c56",
          "&.Mui-checked": { color: "#2b3c56" },
        },
      },
    },
  },
});

const App: React.FC = () => {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/*Default  Path*/}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Protected Routes */}
            <Route
              path="*"
              element={
                <Box sx={{ display: "flex" }}>
                  <Navbar />
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/approval" element={<Approval />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/anlytics" element={<Future />} />
                      <Route path="/schedules" element={<Future/>}/>
                      <Route path="/analytics" element={<Future/>}/>
                      <Route path="/payroll" element={<Future/>}/>
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Box>
                </Box>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
