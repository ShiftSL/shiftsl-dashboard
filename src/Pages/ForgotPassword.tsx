import React, { useState } from "react";
import { TextField, Button, Typography, Link, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import logo from "../img/logo.png";
import illustration from "../img/Group.svg";
import notificationGif from "../assests/OTP.gif"; // Add the path to your notification GIF
import "../CSS/ForgotPassword.css";

interface ForgotPasswordProps {
  onToggleForm: (form: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onToggleForm }) => {
  const navigate = useNavigate(); 
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleOtpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle OTP verification logic here
    navigate("/create-account"); // Redirect to CreateAccount success page
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleResendOtp = () => {
    // Handle resending OTP logic here
    alert("OTP resent");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left-panel">
        <Typography variant="h4" component="h1" gutterBottom>
        Enter Verification Code 
        </Typography>
        <div className="illustration">
          <img src={illustration} alt="Team collaboration" />
        </div>
      </div>
      <div className="forgot-password-right-panel">
        <Container maxWidth="xs">
          <Box textAlign="center" mb={2}>
            <img src={logo} alt="ShiftSL Logo" style={{ maxWidth: "250px", marginBottom: "5px" }} />
          </Box>
          <Box textAlign="center" mb={2}>
            <img src={notificationGif} alt="Notification" style={{ maxWidth: "300px", height: "300px", marginBottom: "5px" }} />
          </Box>
          <Typography variant="h5" component="h3" gutterBottom>
            Enter Verification Code
          </Typography>
          <Typography variant="body1" className="instruction-text" gutterBottom>
            We sent an OTP to your mobile phone ending in ****1234.
          </Typography>
          <form onSubmit={handleOtpSubmit}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" mb={2}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  type="text"
                  variant="outlined"
                  inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                  sx={{
                    border: '1px solid #ccc', // Add border
                    borderRadius: '4px',
                    marginRight: index < otp.length - 1 ? '2px' : '0', // Decrease space between boxes
                    width: '40px', // Adjust width as needed
                    height: '40px' // Adjust height as needed
                  }}
                />
              ))}
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Verify OTP
            </Button>
          </form>
          <Button onClick={handleResendOtp} variant="text" color="primary" fullWidth>
            Resend OTP
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default ForgotPassword;