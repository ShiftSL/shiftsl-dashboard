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
import doctorsData from "../assests/doctors.json";
import {Doctor} from "../Interfaces/Doctor.tsx"

const AddEmployee: React.FC = ({ onDoctorAdded }: { onDoctorAdded: (newDoctor: Doctor) => void }) => {
    const generateNewId = () => {
        const lastDoctor = doctorsData[doctorsData.length - 1];
        return lastDoctor ? BigInt(lastDoctor.id) + BigInt(1): BigInt(1);
    };
    const [formData, setFormData] = useState<Doctor>({
        id: generateNewId(), // Generate ID dynamically
        first_name: "",
        last_name: "",
        email: "",
        role: "Permanent",
        phone_no: "",
    });

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle changes for `<Select>` (Dropdown)
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setFormData((prev) => ({ ...prev, role: e.target.value }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone_no) {
            alert("Please fill all fields");
            return;
        }

        onDoctorAdded(formData); // ✅ Send data to parent component
        setFormData({
            id: formData.id + 1,
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
                    type="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    margin="normal"
                    required
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
