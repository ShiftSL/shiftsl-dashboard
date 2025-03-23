import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../components/logo";
import TeamIllustration from "../components/Group";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#ededed",
      }}
    >
      {/* Left Panel */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "50%",
          backgroundColor: "#2b3c56",
          borderRadius: "16px",
          margin: "16px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ maxWidth: "480px", textAlign: "center", marginBottom: "40px", zIndex: 1 }}>
          <Typography sx={{ color: "#ffffff", fontWeight: 700, fontSize: "40px", lineHeight: 1.2, marginBottom: "16px" }}>
            Welcome !
          </Typography>
          <Typography sx={{ color: "#ffffff", fontWeight: 400, fontSize: "32px", lineHeight: 1.2, marginBottom: "8px" }}>
            Please Sign in to your
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography sx={{ color: "#459257", fontWeight: 600, fontSize: "32px", lineHeight: 1.2 }}>
              shiftSL
            </Typography>
            <Typography sx={{ color: "#ffffff", fontWeight: 400, fontSize: "32px", lineHeight: 1.2, marginLeft: "8px" }}>
              Account
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", justifyContent: "center", zIndex: 1 }}>
          <TeamIllustration />
        </Box>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: { xs: "16px", md: "0 16px 16px 0" },
          margin: { xs: "16px", md: "16px 16px 16px 0" },
          padding: { xs: "24px", sm: "40px" },
        }}
      >
        <Container sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ marginBottom: "40px", display: "flex", justifyContent: "center" }}>
            <Logo />
          </Box>

          <Typography sx={{ textAlign: "center", fontWeight: 700, fontSize: "24px", marginBottom: "4px" }}>Sign In</Typography>
          <Typography sx={{ textAlign: "center", marginBottom: "32px", color: "#666666", fontSize: "14px" }}>Hi ! Welcome back</Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: "16px" }}
            />
            {error && (
              <Typography color="error" sx={{ marginBottom: "16px", fontSize: "14px" }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ backgroundColor: "#2b3c56", color: "white", height: "48px", borderRadius: "8px", textTransform: "none", fontWeight: 500, fontSize: "16px", boxShadow: "none", "&:hover": { backgroundColor: "#1e2a3e", boxShadow: "none" }, marginBottom: "24px" }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;