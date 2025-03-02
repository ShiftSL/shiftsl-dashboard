import React, { useState } from "react";
import { TextField, Button, Typography, Link, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import logo from "../img/logo.png";
import illustration from "../img/Group.svg";
import notificationGif from "../assests/OTP.gif";
import "../CSS/VerificationPage.css";

interface VerificationPageProps {
  onToggleForm: (form: string) => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ onToggleForm }) => {
  const navigate = useNavigate(); 
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleOtpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle OTP verification logic here
    navigate("/success-page"); 
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
    <div className="verification-page-container">
      <div className="verification-page-left-panel">
        <Typography variant="h4" component="h1" gutterBottom>
        Enter Verification Code 
        </Typography>
        <div className="illustration">
          <img src={illustration} alt="Team collaboration" />
        </div>
      </div>
      <div className="verification-page-right-panel">
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
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: index < otp.length - 1 ? '2px' : '0', 
                    width: '40px', 
                    height: '40px',
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

export default VerificationPage;