import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Employees from "./Pages/Employees.tsx";
import Approval from "./Pages/Approval.tsx";
import LoginPage from "./Pages/login";
import ForgotPasswordPage from "./Pages/ForgotPassword";
import CreateAccountPage from "./Pages/CreateAccount";
import UserProfileDialog from "./Components/UserProfile";
import profilePic from "./assests/profile_pic.jpg";

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
  // Managing the authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handling the login and authentication status
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Managing the user data
  const [userData, setUserData] = useState({
    title: "", 
    firstName: "", 
    lastName: "", 
    role: "", 
    email: "", 
    phone: "", 
  });

  // Managing the profile picture
  const [profileImage, setProfileImage] = useState(profilePic);

  // Managing the user profile open close state
  const [open, setOpen] = useState(false);

  // Function to open the user profile dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the user profile dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/*<Route path="/login" element={<LoginPage onLogin={handleLogin} />} />*/}
          {/*<Route path="/forgot-password" element={<ForgotPasswordPage />} />*/}
          {/*<Route path="/create-account" element={<CreateAccountPage />} />*/}
          {/*{isAuthenticated ? (*/}
            <Route
              path="*"
              element={
                <Box sx={{ display: "flex" }}>
                  <Navbar />
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Header userData={userData} profileImage={profileImage} handleClickOpen={handleClickOpen} />
                    <UserProfileDialog
                      open={open}
                      handleClose={handleClose}
                      userData={userData}
                      setUserData={setUserData}
                      profileImage={profileImage}
                      setProfileImage={setProfileImage}
                    />
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/approval" element={<Approval />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </Box>
                </Box>
              }
            />
          {/*) : (*/}
          {/*  <Route path="*" element={<Navigate to="/login" />} />*/}
          {/*)}*/}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
