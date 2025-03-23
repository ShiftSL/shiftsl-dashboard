import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TextField, Button, Box, Typography, Container, Checkbox, FormControlLabel, IconButton, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import Logo from "../Components/logo"
import TeamIllustration from "../Components/Group"
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { app } from "../firebase";

// Handles the form submission for creating new account
const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [role, setRole] = useState("Administrator")
  const [showPassword, setShowPassword] = useState(false)
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  // Handles the Terms of Services dialog
  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);

  // Handles the Privacy Policy dialog
  const handleOpenPrivacy = () => setOpenPrivacy(true);
  const handleClosePrivacy = () => setOpenPrivacy(false);

  // Handling the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the password and confirm password fields are same
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const auth = getAuth(app);
    try {

      // Creating new user with the provided email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created successfully:", userCredential.user);

      // Send email verification
      await sendEmailVerification(userCredential.user);
      alert("Account created successfully! Please verify your email before logging in.");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error creating account:", error);
      alert(error.message);
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
        <Box
          sx={{
            maxWidth: "480px",
            textAlign: "center",
            marginBottom: "40px",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Welcome !
          </Typography>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}
          >
            Create your
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography
              sx={{
                color: "#459257",
                fontWeight: 600,
                fontSize: "32px",
                lineHeight: 1.2,
              }}
            >
              shiftSL
            </Typography>
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: 1.2,
                marginLeft: "8px",
              }}
            >
              Account
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
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
            borderRadius: "16px", 
            margin: { xs: "16px", md: "16px 16px 16px 0" },
            padding: { xs: "24px", sm: "40px" },
          }}
        >
        <Container
          sx={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginBottom: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo />
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: "24px",
              marginBottom: "4px",
            }}
          >
            Create Account
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "32px",
              color: "#666666",
              fontSize: "14px",
            }}
          >
            Join shiftSL to start managing your rosters
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }}>
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                First Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                InputProps={{
                  sx: {
                    backgroundColor: "#ededed",
                    borderRadius: "8px",
                    height: "48px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2b3c56",
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Last Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                InputProps={{
                  sx: {
                    backgroundColor: "#ededed",
                    borderRadius: "8px",
                    height: "48px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2b3c56",
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ width: "100%", display: "flex", gap: "2px", gridColumn: "span 2" }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    sx: {
                      backgroundColor: "#ededed",
                      borderRadius: "8px",
                      height: "48px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #2b3c56",
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Role
                </Typography>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  InputProps={{
                    sx: {
                      backgroundColor: "#ededed",
                      borderRadius: "8px",
                      height: "48px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #2b3c56",
                      },
                    },
                  }}
                >
                  <option value="Administrator">Administrator</option>
                  <option value="HR Administrator">HR Administrator</option>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  sx: {
                    backgroundColor: "#ededed",
                    borderRadius: "8px",
                    height: "48px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2b3c56",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                InputProps={{
                  sx: {
                    backgroundColor: "#ededed",
                    borderRadius: "8px",
                    height: "48px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2b3c56",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  sx={{
                    color: "#2b3c56",
                    "&.Mui-checked": {
                      color: "#2b3c56",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#666666",
                  }}
                >
                  I agree to the{" "}
                  <span
                    onClick={handleOpenTerms}
                    style={{ color: "#2b3c56", fontWeight: 500, textDecoration: "underline", cursor: "pointer" }}
                  >
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span
                    onClick={handleOpenPrivacy}
                    style={{ color: "#2b3c56", fontWeight: 500, textDecoration: "underline", cursor: "pointer" }}
                  >
                    Privacy Policy
                  </span>
                </Typography>
              }
              sx={{ gridColumn: "span 2", marginBottom: "24px" }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!agreeTerms}
              sx={{
                backgroundColor: "#2b3c56",
                color: "white",
                height: "48px",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "16px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#1e2a3e",
                  boxShadow: "none",
                },
                marginBottom: "24px",
                "&.Mui-disabled": {
                  backgroundColor: "#a0a0a0",
                  color: "#ffffff",
                },
                gridColumn: "span 2",
              }}
            >
              Create Account
            </Button>

            <Box
              sx={{
                textAlign: "center",
                width: "100%",
                gridColumn: "span 2",
              }}
            >
              <Typography
                sx={{
                  color: "#666666",
                  fontSize: "14px",
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#0000ff", 
                    fontWeight: 500,
                    textDecoration: "underline",
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </form>
        </Container>
      </Box>

      {/* Terms of Service Dialog */}
      <Dialog open={openTerms} onClose={handleCloseTerms} maxWidth="sm" fullWidth>
        <DialogTitle>Terms of Service</DialogTitle>
        <DialogContent>
          <Typography>
            1. <strong>Account Registration</strong> – Users must provide accurate information and maintain account security.
          </Typography>
          <Typography>
            2. <strong>Use of Services</strong> – ShiftSL is a scheduling platform for healthcare professionals, misuse is prohibited.
          </Typography>
          <Typography>
            3. <strong>User Responsibilities</strong> – Keep account details updated and do not share credentials.
          </Typography>
          <Typography>
            4. <strong>Termination</strong> – ShiftSL may suspend accounts for violations.
          </Typography>
          <Typography>
            5. <strong>Limitation of Liability</strong> – We are not liable for service disruptions.
          </Typography>
          <Typography>
            6. <strong>Modifications</strong> – Terms may be updated periodically.
          </Typography>
          <Typography>
            <strong>Contact for inquiries</strong> – <a href="mailto:info@shiftsl.com" style={{ color: "#2b3c56" }}>info@shiftsl.com</a>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTerms} sx={{ color: "#2b3c56" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog open={openPrivacy} onClose={handleClosePrivacy} maxWidth="sm" fullWidth>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <Typography>
            1. <strong>Data Collection</strong> – We collect personal details, usage data, and device information.
          </Typography>
          <Typography>
            2. <strong>Data Use</strong> – Information is used for scheduling, communication, and service improvement.
          </Typography>
          <Typography>
            3. <strong>Data Sharing & Security</strong> – We do not sell data, security measures are in place.
          </Typography>
          <Typography>
            4. <strong>User Rights</strong> – Users can access, update, or delete their data.
          </Typography>
          <Typography>
            5. <strong>Data Retention</strong> – Data is stored as necessary and deleted upon account removal.
          </Typography>
          <Typography>
            6. <strong>Policy Changes</strong> – Updates will be posted periodically.
          </Typography>
          <Typography>
            <strong>Contact for inquiries</strong> – <a href="mailto:info@shiftsl.com" style={{ color: "#2b3c56" }}>info@shiftsl.com</a>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrivacy} sx={{ color: "#2b3c56" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CreateAccountPage

