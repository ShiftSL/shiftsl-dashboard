import { Avatar, Box, Typography, styled } from "@mui/material"

const StyledHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "16px 24px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e0e0e0",
  height: "50px",
})

const ProfileAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  backgroundColor: "#e0e0e0",
  cursor: "pointer",
})

interface HeaderProps {
  userData: {
    firstName: string;
    lastName: string;
  };
  profileImage?: string;
  handleClickOpen: () => void;
}

const Header = ({ userData, profileImage, handleClickOpen }: HeaderProps) => {
  return (
    <StyledHeader>
      <Typography variant="h6" sx={{ fontWeight: 600, marginRight: "8px" }}>
        Hello! <span style={{ color: "#131313" }}>{userData.firstName}</span>
      </Typography>
      <ProfileAvatar onClick={handleClickOpen}>
        <img
          src={profileImage || "/assets/placeholder.svg"}
          alt={`${userData.firstName} ${userData.lastName}`}
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </ProfileAvatar>
    </StyledHeader>
  )
}

export default Header