import type React from "react"
import { useState, useEffect, useRef } from "react"
import { TextField, Button, Typography } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import logo from "../img/logo.png"
import illustration from "../img/Group.svg"
import notificationGif from "../assests/OTP.gif"
import "../CSS/VerificationPage.css"

interface VerificationPageProps {
  onToggleForm: (form: string) => void
}

const VerificationPage: React.FC<VerificationPageProps> = ({ onToggleForm }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [phoneNumber, setPhoneNumber] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Extract phone number from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const phone = queryParams.get("phone") || ""
    setPhoneNumber(phone)
  }, [location])

  // Get last 4 digits of phone number
  const lastFourDigits = phoneNumber.length >= 4 ? phoneNumber.slice(-4) : phoneNumber

  const handleOtpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const otpValue = otp.join("")
    if (otpValue.length === 6) {
      // Add validation logic here
      navigate("/success-page")
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Handle paste event
    if (value.length > 1) {
      const pastedValue = value.slice(0, 6)
      const otpArray = pastedValue.split("").slice(0, 6)
      setOtp([...otpArray, ...Array(6 - otpArray.length).fill("")])

      // Focus last input or next empty input
      const nextIndex = Math.min(index + otpArray.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty, move to previous input
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1]?.focus()
      } else {
        // Clear current input
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    }
    // Handle left arrow
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    // Handle right arrow
    else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const [resendDisabled, setResendDisabled] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)

  const handleResendOtp = () => {
    setResendDisabled(true)
    setResendTimer(30)

    // Start countdown
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setResendDisabled(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Simulate OTP resend
    alert("New OTP has been sent!")
  }

  return (
    <div className="verification-page-container">
      <div className="verification-page-left-panel">
        <Typography variant="h4" component="h1" gutterBottom>
          Enter Verification Code
        </Typography>
        <div className="illustration">
          <img src={illustration || "/placeholder.svg"} alt="Team collaboration" />
        </div>
      </div>
      <div className="verification-page-right-panel">
        <div className="verification-content">
          <div className="logo-container">
            <img src={logo || "/placeholder.svg"} alt="ShiftSL Logo" className="logo-image" />
          </div>
          <div className="notification-container">
            <img src={notificationGif || "/placeholder.svg"} alt="Notification" className="notification-image" />
          </div>
          <Typography variant="h5" component="h3" className="verification-title">
            Enter Verification Code
          </Typography>
          <Typography variant="body1" className="instruction-text">
            We sent an OTP to your mobile phone ending in ****{lastFourDigits}
          </Typography>
          <form onSubmit={handleOtpSubmit} className="otp-form">
            <div className="otp-container">
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  variant="outlined"
                  value={digit}
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    style: { textAlign: "center" },
                  }}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-input"
                  autoComplete="off"
                />
              ))}
            </div>
            <Button
              type="submit"
              variant="contained"
              className="verify-otp-button"
              disabled={otp.join("").length !== 6}
            >
              Verify OTP
            </Button>
          </form>
          <Button onClick={handleResendOtp} variant="contained" className="resend-button" disabled={resendDisabled}>
            {resendDisabled ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage

