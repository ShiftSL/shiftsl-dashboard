import type React from "react"
import { Box } from "@mui/material"
import groupImage from "../assests/Group.svg" 

const GroupIllustration: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={groupImage} 
        alt="Team Collaboration"
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </Box>
  )
}

export default GroupIllustration
