import React, { ChangeEvent, useState } from "react";
import {Button, TextField, Select, MenuItem, FormControl, Typography, Paper,} from "@mui/material";
import { UserDTO, UserRole } from "../types/user.ts";
import { SelectChangeEvent } from "@mui/material"; // Import SelectChangeEvent

// Define props interface
interface AddEmployeeProps {
    onDoctorAdded: (newDoctor: UserDTO) => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ onDoctorAdded }) => {
    const [formData, setFormData] = useState<UserDTO>({
        firstName: "",
        lastName: "",
        phoneNo: "",
        email: "",
        role: UserRole.DOCTOR_PERM,
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        email: "",
    });

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData((prev) => ({
            ...prev,
            role: e.target.value as UserRole.DOCTOR_PERM | UserRole.DOCTOR_TEMP,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form fields
        let formErrors = { ...errors };
        let isValid = true;

        if (!formData.firstName) {
            formErrors.firstName = "First Name is required";
            isValid = false;
        }

        if (!formData.lastName) {
            formErrors.lastName = "Last Name is required";
            isValid = false;
        }

        if (!formData.email) {
            formErrors.email = "Email is required";
            isValid = false;
        }

        if (!formData.phoneNo) {
            formErrors.phoneNo = "Phone Number is required";
            isValid = false;
        }

        setErrors(formErrors);

        if (isValid) {
            onDoctorAdded(formData);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                role: UserRole.DOCTOR_PERM,
                phoneNo: "",
            });
            console.log(formData);
        }
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
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleTextChange}
                    margin="normal"
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName}
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
                    error={!!errors.email}
                    helperText={errors.email}
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
                    error={!!errors.phoneNo}
                    helperText={errors.phoneNo}
                />

                <FormControl fullWidth margin="normal">

                    <Select
                        name="role"
                        value={formData.role}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={UserRole.DOCTOR_PERM}>Permanent</MenuItem>
                        <MenuItem value={UserRole.DOCTOR_TEMP}>Temporary</MenuItem>
                        <MenuItem value={UserRole.WARD_ADMIN}>Ward-Admin</MenuItem>
                        <MenuItem value={UserRole.HR_ADMIN}>HR-Admin</MenuItem>
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
