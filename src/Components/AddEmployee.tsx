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
    const generateNewId = (): bigint => {
        const lastDoctor = doctorsData[doctorsData.length - 1];
        return lastDoctor ? BigInt(lastDoctor.id) + BigInt(1) : BigInt(1);
    };

    const [formData, setFormData] = useState<Doctor>({
        id: generateNewId(), // Generate ID dynamically in BigInt
        first_name: "",
        last_name: "",
        email: "",
        role: "Permanent",
        phone_no: "",
    });

    const [emailError, setEmailError] = useState<string>("");

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        //email validation
        if (name === "email") {
            validateEmail(value);
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setFormData((prev) => ({ ...prev, role: e.target.value }));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmailError(emailRegex.test(email) ? "" : "Invalid email address");
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone_no) {
            alert("Please fill all fields");
            return;
        } // validation

        if (emailError) {
            alert("Please enter a valid email address");
            return;
        } 

        onDoctorAdded(formData);
        setFormData({
            id: formData + (BigInt(1)), // making sure a BigInt is added to avoid type errors
            first_name: "",
            last_name: "",
            email: "",
            role: "Permanent",
            phone_no: "",
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
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleTextChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleTextChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    // type="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    margin="normal"
                    required
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_no"
                    type="tel"
                    value={formData.phone_no}
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
                        <MenuItem value="Permanent">Permanent</MenuItem>
                        <MenuItem value="Temporary">Temporary</MenuItem>
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
