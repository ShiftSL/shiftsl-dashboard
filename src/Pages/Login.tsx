import React from "react";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import logo from "../img/logo.png";
import illustration from "../img/Group.svg";
import "../CSS/Login.css";

interface LoginProps {
  onToggleForm: (form: string) => void;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onToggleForm, onLoginSuccess }) => {
  const navigate = useNavigate(); 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Dummy login validation
    onLoginSuccess();
  };

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <Typography variant="h4" component="h1" className="mb-6">
          Welcome!<br />Sign in to your <span className="highlight">shiftSL</span> Account
        </Typography>
        <div className="illustration">
          <img src={illustration} alt="Team collaboration" className="max-w-full h-auto" />
        </div>
      </div>
      <div className="login-right-panel">
        <div className="form-container">
          <div className="form-logo">
            <img src={logo} alt="ShiftSL Logo" className="max-w-xs mx-auto" />
          </div>
          <Typography variant="h5" component="h3" className="mb-2 text-gray-800">
            Sign In
          </Typography>
          <Typography variant="body1" className="welcome-text">
            Hi! Welcome back
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField label="Email" type="email" variant="outlined" required fullWidth />
            <TextField label="Password" type="password" variant="outlined" required fullWidth />
            <Link href="#" onClick={() => onToggleForm("forgotPassword")} className="forgot-password">
              Forgot Password?
            </Link>
            <Button type="submit" variant="contained" color="primary" className="mt-4">
              Sign In
            </Button>
            <Typography variant="body2" className="signup-text">
              Don’t have an account?{" "}
              <Link href="#" onClick={() => navigate("/create-account")} className="create-account">
                Create new one
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
