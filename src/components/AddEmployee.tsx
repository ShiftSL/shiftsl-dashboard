import React, { ChangeEvent, useState } from "react";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Paper,
    SelectChangeEvent
} from "@mui/material";
import { UserRole, UserDTO } from "../Interfaces/User";

const AddEmployee: React.FC<{ onUserAdded: (newUserr: UserDTO) => void }> = ({ onUserAdded }) => {
    const [formData, setFormData] = useState<UserDTO>({
        firstName: "",
        lastName: "",
        phoneNo: "",
        email: "",
        role: UserRole.DOCTOR_PERM,  // Default role
    });

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData((prev) => ({ ...prev, role: e.target.value as UserRole }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNo) {
            alert("Please fill all fields");
            return;
        }

        onUserAdded(formData); // Pass the new doctor to the parent
        setFormData({
            firstName: "",
            lastName: "",
            phoneNo: "",
            email: "",
            role: UserRole.DOCTOR_PERM, // Reset to default role after form submission
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: "400px", margin: "20px auto" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Add New Doctor
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleTextChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleTextChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNo"
                    type="tel"
                    value={formData.phoneNo}
                    onChange={handleTextChange}
                    margin="normal"
                    required
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                        name="role"
                        value={formData.role}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={UserRole.DOCTOR_PERM}>Permanent</MenuItem>
                        <MenuItem value={UserRole.DOCTOR_TEMP}>Temporary</MenuItem> {/* Fixed value here */}
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                    Add Doctor
                </Button>
            </form>
        </Paper>
    );
};

export default AddEmployee;
