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
import nursesData from "../assests/nurses.json";
import {Nurse} from "../Interfaces/Nurse.tsx"

const AddNurse: React.FC = ({ onNurseAdded }: { onNurseAdded: (newNurse: Nurse) => void }) => {
    const generateNewId = (): bigint => {
        const lastNurse = nursesData[nursesData.length - 1];
        return lastNurse ? BigInt(lastNurse.id) + BigInt(1) : BigInt(1);
    };

    const [formData, setFormData] = useState<Nurse>({
        id: generateNewId(), // Generate ID dynamically in BigInt
        first_name: "",
        last_name: "",
        email: "",
        role: "Permanent",
        phone_no: "",
        ward: ""
    });

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone_no || !formData.ward) {
            alert("Please fill all fields");
            return;
        } // validation

        onNurseAdded(formData);
        setFormData({
            id: formData + (BigInt(1)), // making sure a BigInt is added to avoid type errors
            first_name: "",
            last_name: "",
            email: "",
            role: "Permanent",
            phone_no: "",
            ward: ""
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: "400px", margin: "20px auto" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Add New Nurse
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
                    <InputLabel>Select Ward</InputLabel>
                    <Select
                        name="ward"
                        value={formData.ward}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="">Select ward</MenuItem>
                        <MenuItem value="ward1">Ward 1</MenuItem>
                        <MenuItem value="ward2">Ward 2</MenuItem>
                        <MenuItem value="ward3">Ward 3</MenuItem>
                     </Select>
                </FormControl> 

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
                    Add Nurse
                </Button>
            </form>
        </Paper>
    );
};

export default AddNurse;
