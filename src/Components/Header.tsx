import { Avatar, Box, Typography, styled } from "@mui/material"

const StyledHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e0e0e0",
  height: "64px",
})

const Header = () => {
  return (
    <StyledHeader>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Hello! <span style={{ color: "#131313" }}>Admin</span>
      </Typography>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          backgroundColor: "#e0e0e0",
        }}
      >
        A
      </Avatar>
    </StyledHeader>
  )
}

export default Header
