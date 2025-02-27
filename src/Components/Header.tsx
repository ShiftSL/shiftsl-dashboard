import { Avatar, Box, Typography, styled } from "@mui/material"
import profilePic from "../assests/profile_pic.jpg"

const StyledHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "16px 24px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e0e0e0",
  height: "50px",
})

const Header = () => {
  return (
    <StyledHeader>
      <Typography variant="h6" sx={{ fontWeight: 600, marginRight: "8px" }}>
        Hello! <span style={{ color: "#131313" }}>Admin</span>
      </Typography>
      <Avatar
        sx={{
          width: 40,
          height: 40,
          backgroundColor: "#e0e0e0",
        }}
      >
        <img
          src={profilePic}
          alt="Admin"
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </Avatar>
    </StyledHeader>
  )
}

export default Header