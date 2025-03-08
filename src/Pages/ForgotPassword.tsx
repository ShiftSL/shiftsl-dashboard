import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { TextField, Button, Box, Typography, Container } from "@mui/material"
import Logo from "../Components/logo"
import TeamIllustration from "../Components/Group"

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log("Reset password for:", email)
    setSubmitted(true)
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
            Forgot Password?
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
            Don't worry, we'll help you reset your
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
              Password
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

          {!submitted ? (
            <>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "24px",
                  marginBottom: "4px",
                }}
              >
                Reset Password
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  marginBottom: "32px",
                  color: "#666666",
                  fontSize: "14px",
                }}
              >
                Enter your email and we'll send you instructions to reset your password
              </Typography>

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Box sx={{ marginBottom: "24px", width: "100%" }}>
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
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
                  }}
                >
                  Send Reset Link
                </Button>

                <Box
                  sx={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#666666",
                      fontSize: "14px",
                    }}
                  >
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      style={{
                        color: "#2b3c56",
                        fontWeight: 500,
                        textDecoration: "none",
                        textDecoration: "underline",
                        color: "blue",
                        fontSize: "14px",
                      }}
                    >
                      Back to Sign In
                    </Link>
                  </Typography>
                </Box>
              </form>
            </>
          ) : (
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "24px",
                  marginBottom: "16px",
                }}
              >
                Check Your Email
              </Typography>
              <Typography
                sx={{
                  marginBottom: "16px",
                  color: "#666666",
                  fontSize: "14px",
                }}
              >
                We've sent a password reset link to {email}
              </Typography>
              <Typography
                sx={{
                  marginBottom: "24px",
                  color: "#888888",
                  fontSize: "14px",
                }}
              >
                Didn't receive the email? Check your spam folder or
              </Typography>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outlined"
                sx={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                  borderColor: "#ddd",
                  color: "#555",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#ccc",
                  },
                  marginBottom: "24px",
                }}
              >
                Try another email
              </Button>
              <Box sx={{ marginTop: "16px" }}>
                <Link
                  to="/login"
                  style={{
                    color: "#2b3c56",
                    fontWeight: 500,
                    textDecoration: "none",
                    textDecoration: "underline",
                    color: "blue",
                    fontSize: "14px",
                  }}
                >
                  Back to Sign In
                </Link>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

export default ForgotPasswordPage

