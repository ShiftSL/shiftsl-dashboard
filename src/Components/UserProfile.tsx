import { useRef } from "react"
import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  styled,
} from "@mui/material"
import { CameraAlt as CameraIcon } from "@mui/icons-material"

const LargeAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  backgroundColor: "#e0e0e0",
  margin: "0 auto 20px",
})

const UploadButton = styled(IconButton)({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "#1976d2",
  color: "white",
  padding: "8px",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
})

interface UserProfileDialogProps {
  open: boolean;
  handleClose: () => void;
  userData: {
    title: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  setUserData: (data: any) => void;
  profileImage: string;
  setProfileImage: (image: string) => void;
}

const UserProfileDialog = ({ open, handleClose, userData, setUserData, profileImage, setProfileImage }: UserProfileDialogProps) => {
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Submitting user data:", userData)
    handleClose()
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleImageChange = (event: ImageChangeEvent) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        {/* Profile Picture */}
        <Box sx={{ position: "relative", width: "fit-content", margin: "0 auto 20px" }}>
          <LargeAvatar>
            <img
              src={profileImage || "/placeholder.svg"}
              alt={`${userData.firstName} ${userData.lastName}`}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </LargeAvatar>
          <UploadButton size="small" onClick={handleImageClick}>
            <CameraIcon fontSize="small" />
          </UploadButton>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="title-label">Title</InputLabel>
              <Select labelId="title-label" name="title" value={userData.title} label="Title" onChange={handleChange}>
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Dr">Dr</MenuItem>
                <MenuItem value="Prof">Prof</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Role */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select labelId="role-label" name="role" value={userData.role} label="Role" onChange={handleChange}>
                <MenuItem value="Administrator">Administrator</MenuItem>
                <MenuItem value="HR Administrator">HR Administrator</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* First Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField fullWidth label="Phone Number" name="phone" value={userData.phone} onChange={handleChange} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserProfileDialog
