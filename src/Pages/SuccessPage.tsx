import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container } from "@mui/material";
import logo from "../img/logo.png";
import illustration from "../img/Group.svg";
import successTick from "../assests/success.png";
import "../CSS/SuccessPage.css";

interface SuccessPageProps {
  onToggleForm: (form: string) => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          navigate("/dashboard");
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  const handleLoginClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="success-page-container">
      <div className="success-page-left-panel">
        <Typography variant="h4" component="h1" gutterBottom>
          Account Created Successfully!
        </Typography>
        <div className="illustration">
          <img src={illustration} alt="Team collaboration" />
        </div>
      </div>
      <div className="success-page-right-panel">
        <Container maxWidth="xs">
          <Box textAlign="center" mb={2}>
            <img src={logo} alt="ShiftSL Logo" style={{ maxWidth: "250px", marginBottom: "5px" }} />
          </Box>
          <Box textAlign="center" mb={2}>
            <img src={successTick} alt="Success Tick" style={{ maxWidth: "100px", marginBottom: "5px" }} />
          </Box>
          <Typography variant="h5" component="h3" gutterBottom>
            Welcome to shiftSL!
          </Typography>
          <Typography variant="body2" align="center" className="login-text" mt={2}>
            Your account has been created successfully. You can now log in to your account.
          </Typography>
          <Typography variant="body2" align="center" className="login-text" mt={2}>
            Redirecting to Dashboard in {timer} seconds...
          </Typography>
          <Box textAlign="center" mt={2}>
            <button className="verify-button" onClick={handleLoginClick}>Login to Dashboard</button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default SuccessPage;
