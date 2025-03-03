import type React from "react"
import { useState } from "react"
import { TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Flag from "react-world-flags"
import logo from "../img/logo.png"
import illustration from "../img/Group.svg"
import "../CSS/Login.css"

const countryCodes = [
  { code: "+1", country: "United States", flag: "US" },
  { code: "+44", country: "United Kingdom", flag: "GB" },
  { code: "+91", country: "India", flag: "IN" },
  { code: "+94", country: "Sri Lanka", flag: "LK" },
  { code: "+61", country: "Australia", flag: "AU" },
  { code: "+81", country: "Japan", flag: "JP" },
  { code: "+49", country: "Germany", flag: "DE" },
  { code: "+33", country: "France", flag: "FR" },
  { code: "+39", country: "Italy", flag: "IT" },
  { code: "+86", country: "China", flag: "CN" },
  { code: "+7", country: "Russia", flag: "RU" },
  { code: "+55", country: "Brazil", flag: "BR" },
  { code: "+27", country: "South Africa", flag: "ZA" },
  { code: "+34", country: "Spain", flag: "ES" },
  { code: "+1-242", country: "Bahamas", flag: "BS" },
  { code: "+1-246", country: "Barbados", flag: "BB" },
  { code: "+1-441", country: "Bermuda", flag: "BM" },
  { code: "+1-284", country: "British Virgin Islands", flag: "VG" },
  { code: "+1-345", country: "Cayman Islands", flag: "KY" },
  { code: "+1-767", country: "Dominica", flag: "DM" },
  { code: "+1-809", country: "Dominican Republic", flag: "DO" },
  { code: "+1-473", country: "Grenada", flag: "GD" },
  { code: "+1-876", country: "Jamaica", flag: "JM" },
  { code: "+1-664", country: "Montserrat", flag: "MS" },
  { code: "+1-869", country: "Saint Kitts and Nevis", flag: "KN" },
  { code: "+1-758", country: "Saint Lucia", flag: "LC" },
  { code: "+1-784", country: "Saint Vincent and the Grenadines", flag: "VC" },
  { code: "+1-868", country: "Trinidad and Tobago", flag: "TT" },
  { code: "+1-649", country: "Turks and Caicos Islands", flag: "TC" },
  { code: "+1-340", country: "U.S. Virgin Islands", flag: "VI" },
]

const LoginPage: React.FC = () => {
  const [countryCode, setCountryCode] = useState(countryCodes[0].code)
  const [mobileNumber, setMobileNumber] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Dummy login validation
    if (countryCode === "+1" && mobileNumber === "1234567890") {
      navigate("/dashboard")
    } else {
      // Pass the mobile number to the verification page
      navigate(`/verification-page?phone=${mobileNumber}`)
    }
  }

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <Typography variant="h4" component="h1">
          Welcome!
          <br />
          Sign in to your <span className="highlight">shiftSL</span> Account
        </Typography>
        <div className="illustration">
          <img src={illustration || "/placeholder.svg"} alt="Team collaboration" />
        </div>
      </div>
      <div className="login-right-panel">
        <div className="form-container">
          <div className="form-logo">
            <img src={logo || "/placeholder.svg"} alt="ShiftSL Logo" className="logo-image" />
          </div>
          <Typography variant="body1" className="welcome-text">
            Hi! Welcome back
          </Typography>
          <Typography variant="h5" component="h3">
            Please Enter Your Mobile Number
          </Typography>
          <Typography variant="body1" className="welcome-text">
            We will send you a (OTP) to verify your mobile number
          </Typography>

          <form onSubmit={handleSubmit} className="login-form">
            <FormControl fullWidth variant="outlined" className="country-code-select">
              <InputLabel id="country-code-label">Country Code</InputLabel>
              <Select
                labelId="country-code-label"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value as string)}
                label="Country Code"
              >
                {countryCodes.map((code) => (
                  <MenuItem key={code.code} value={code.code}>
                    <Flag code={code.flag} style={{ width: 20, height: 15, marginRight: 8 }} />
                    {code.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Mobile Number"
              type="tel"
              variant="outlined"
              required
              fullWidth
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="mobile-input"
            />
            <Button type="submit" variant="contained" color="primary" className="verify-button">
              VERIFY
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

