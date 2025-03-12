import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import AssignDoctorForm from "./Components/AssignDoctorForm";
import Header from "./Components/Header";
import Employees from "./Pages/Employees.tsx";
import Approval from "./Pages/Approval.tsx";
import LoginPage from "./Pages/login";
import ForgotPasswordPage from "./Pages/ForgotPassword";
import CreateAccountPage from "./Pages/CreateAccount";
import Analytics from "./Pages/Analytics.tsx";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2b3c56",
    },
    secondary: {
      main: "#459257",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#2b3c56",
          "&.Mui-checked": {
            color: "#2b3c56",
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  // Example doctors' analytics data for testing
  const doctorsAnalytics = [
    {
      name: 'Dr. John Doe',
      coveredShifts: 15,
      coveredHours: 120,
      leavesTaken: 3,
      hoursRemaining: 20,
    },
    {
      name: 'Dr. Jane Smith',
      coveredShifts: 12,
      coveredHours: 100,
      leavesTaken: 5,
      hoursRemaining: 25,
    },
  ];
   //fetch actual data from APIs later
  //  const fetchDoctorsAnalytics = async () => {
  //   try {
  //     const response = await fetch("/api/doctors-analytics");
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching doctors' analytics data: ", error);
  //     return [];
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          {isAuthenticated ? (
            <Route
              path="*"
              element={
                <Box sx={{ display: "flex" }}>
                  <Navbar />
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Header />
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/approval" element={<Approval />} />
                      <Route
                        path="/analytics"
                        element={<Analytics doctorsAnalytics={doctorsAnalytics} />} // Add Analytics route
                      />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </Box>
                </Box>
              }
            />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
