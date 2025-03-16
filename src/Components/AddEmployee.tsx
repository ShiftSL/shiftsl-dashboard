import React, {ChangeEvent, useState} from "react";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Paper, SelectChangeEvent
} from "@mui/material";
import doctorsData from "../jsonfiles/doctors.json";
import {Doctor} from "../Interfaces/Doctor.tsx"

const AddEmployee: React.FC = ({ onDoctorAdded }: { onDoctorAdded: (newDoctor: Doctor) => void }) => {
    const generateNewId = (): number => {
        const lastDoctor = doctorsData[doctorsData.length - 1];
        return lastDoctor ? lastDoctor.id +1 :1;
    };

    const [formData, setFormData] = useState<Doctor>({
        id: generateNewId(), // Generate ID dynamically in BigInt
        firstName: "",
        lastName: "",
        phoneNo:"",
        email: "",
        role: "DOCTOR",
    });

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData((prev) => ({ ...prev, role: e.target.value as "DOCTOR" |"EMPLOYEE"
            }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNo) {
            alert("Please fill all fields");
            return;
        } // validation

        onDoctorAdded(formData);
        setFormData({
            id: generateNewId(),
            firstName: "",
            lastName: "",
            email: "",
            role: "DOCTOR",
            phoneNo: "",
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
                        onChange={(e) => handleSelectChange(e as any)}
                    >
                        <MenuItem value="DOCTOR">Permanent</MenuItem>
                        <MenuItem value="EMPLOYEE">Temporary</MenuItem>  //TODO: Ask Punjitha to update the backend to incorporate Permanent & Temporary Roles of Doctors
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
