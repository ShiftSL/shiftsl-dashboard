import React from "react";
import { TextField, Button, Typography, Link, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../img/logo.png";
import illustration from "../img/Group.svg";
import "../CSS/CreateAccount.css";

interface CreateAccountProps {
  onToggleForm: (form: string) => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ onToggleForm }) => {
  const navigate = useNavigate(); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle account creation logic here
    navigate("/login"); 
  };

  return (
    <div className="create-account-container">
      <div className="create-account-left-panel">
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New <br /> <span className="highlight">shiftSL</span> Account
        </Typography>
        <div className="illustration">
          <img src={illustration} alt="Team collaboration" />
        </div>
      </div>
      <div className="create-account-right-panel">
        <Container maxWidth="xs">
          <Box textAlign="center" mb={2}>
            <img src={logo} alt="ShiftSL Logo" style={{ maxWidth: "250px", marginBottom: "5px" }} />
          </Box>
          <Typography variant="h5" component="h3" gutterBottom>
            Create Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" variant="outlined" fullWidth margin="normal" required />
            <TextField label="Email" type="email" variant="outlined" fullWidth margin="normal" required />
            <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" required />
            <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" required />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
            <Typography variant="body2" align="center" className="login-text" mt={2}>
              Already have an account?{" "}
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

export default CreateAccount;
