import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { TextField, Button, Box, Typography, Container, Checkbox, FormControlLabel } from "@mui/material"
import Logo from "../Components/logo"
import TeamIllustration from "../Components/Group"

const CreateAccountPage: React.FC = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handling the registration logic
    console.log("Register with:", firstName, lastName, email, password)
  }

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
          borderRadius: { xs: "16px", md: "0 16px 16px 0" },
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
            Join shiftSL to start managing your projects
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

            <Box sx={{ width: "100%", gridColumn: "span 2" }}>
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
                type="password"
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
                type="password"
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
                  <Link to="/terms" style={{ color: "#2b3c56", fontWeight: 500, textDecoration: "none" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" style={{ color: "#2b3c56", fontWeight: 500, textDecoration: "none" }}>
                    Privacy Policy
                  </Link>
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
                    color: "#2b3c56",
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
    </Box>
  )
}

export default CreateAccountPage

