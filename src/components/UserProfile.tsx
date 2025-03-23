import { useRef, useState } from "react"
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

// Interface for User Profile props
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

// Components of the User Profile
const UserProfileDialog = ({ open, handleClose, userData, setUserData, profileImage, setProfileImage }: UserProfileDialogProps) => {
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  // Updating the use data when the form field values changes
  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  // Handling the form field changes
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handling the form submission
  const handleSubmit = () => {
    const newErrors = {
      firstName: userData.firstName ? "" : "First name is required",
      lastName: userData.lastName ? "" : "Last name is required",
      email: /\S+@\S+\.\S+/.test(userData.email) ? "" : "Email is invalid",
      phone: /^\d{10}$/.test(userData.phone) ? "" : "Phone number is invalid",
    }
    setErrors(newErrors)

    if (Object.values(newErrors).every((error) => error === "")) {
      console.log("Submitting user data:", userData)
      handleClose()
    }
  }

  // Handling the profile picture by click
  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  // Interface for image change event
  interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  // Handling the change of the profile picture
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
              error={!!errors.firstName}
              helperText={errors.firstName}
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
              error={!!errors.lastName}
              helperText={errors.lastName}
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
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField fullWidth label="Phone Number" name="phone" value={userData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
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
