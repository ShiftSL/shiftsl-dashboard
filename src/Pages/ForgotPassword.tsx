import React from "react";
import { TextField, Button, Typography, Link, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../img/logo.png";
import illustration from "../img/Group.svg";
import "../CSS/ForgotPassword.css";

interface ForgotPasswordProps {
  onToggleForm: (form: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onToggleForm }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle forgot password logic here
    navigate("/login"); // Navigate to the login page after submitting the form
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left-panel">
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Your <br /> <span className="highlight">shiftSL</span> Password
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
          <Typography variant="h5" component="h3" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body1" className="instruction-text" gutterBottom>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" type="email" variant="outlined" fullWidth margin="normal" required />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Reset Link
            </Button>
            <Typography variant="body2" align="center" className="login-text" mt={2}>
              Remember your password?{" "}
              <Link href="#" onClick={() => navigate("/login")} className="login-link">
                Sign in
              </Link>
            </Typography>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default ForgotPassword;
