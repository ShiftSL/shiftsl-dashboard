import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Typography } from "@mui/material"
import logo from "../img/logo.png"
import illustration from "../img/Group.svg"
import successTick from "../assests/success.png"
import "../CSS/SuccessPage.css"

interface SuccessPageProps {
  onToggleForm: (form: string) => void
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onToggleForm }) => {
  const navigate = useNavigate()
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown)
          navigate("/dashboard")
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(countdown)
  }, [navigate])

  const handleLoginClick = () => {
    navigate("/dashboard")
  }

  return (
    <div className="success-page-container">
      <div className="success-page-left-panel">
        <Typography variant="h4" component="h1">
          Account Created Successfully!
        </Typography>
        <div className="illustration">
          <img src={illustration || "/placeholder.svg"} alt="Team collaboration" />
        </div>
      </div>
      <div className="success-page-right-panel">
        <div className="success-content">
          <div className="logo-container">
            <img src={logo || "/placeholder.svg"} alt="ShiftSL Logo" className="logo-image" />
          </div>
          <div className="success-icon-container">
            <img src={successTick || "/placeholder.svg"} alt="Success Tick" className="success-icon" />
          </div>
          <Typography variant="h5" component="h3" className="success-title">
            Welcome to shiftSL!
          </Typography>
          <Typography variant="body2" className="login-text">
            Your account has been created successfully. You can now log in to your account.
          </Typography>
          <Typography variant="body2" className="login-text timer-text">
            Redirecting to Dashboard in <span className="timer-count">{timer}</span> seconds...
          </Typography>
          <button className="verify-button" onClick={handleLoginClick}>
            LOGIN TO DASHBOARD
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage

