import type React from "react"
import { Box } from "@mui/material"
import logoImage from "../assests/logo.png" 

const Logo: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
        src={logoImage as string}
        alt="shiftSL Logo"
        style={{
          height: "40px",
          width: "auto",
        }}
      />
    </Box>
  )
}

export default Logo

