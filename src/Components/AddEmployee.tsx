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
        phoneNo:"+94",
        email: "",
        role: "DOCTOR_PERM",

    });

    const [emailError, setEmailError] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        //email validation
        if (name === "email") {
            validateEmail(value);
        }
        //phone number validation
        if (name === "phoneNo") {
            if(!value.startsWith("+94")){ //make sure +94 is not deleted
                setFormData((prev) => ({ ...prev, phoneNo: "+94" }));
                return;
            }
            //move cursor after +94
           const cursorPosition = e.target.selectionStart || 0; //get cursor position or deafult to 0
           if(cursorPosition<3){
            e.target.setSelectionRange(3,3);
           }
           validatePhone(value);
    
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData((prev) => ({ ...prev, role: e.target.value as "DOCTOR_PERM" |"DOCTOR_TEMP"
            }));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmailError(emailRegex.test(email) ? "" : "Invalid email address");
    };
    const validatePhone = (phone: string) => {
        const phoneRegex = /^\+94\d{9}$/;
        setPhoneError(phoneRegex.test(phone) ? "" : "Invalid phone number");
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNo) {

            alert("Please fill all fields");
            return;
        } // validation

        if (emailError ) {
            alert("Invalid email address");
            return;
        }
        if (phoneError) {
            alert("Invalid phone number");
            return;
        }
          

        onDoctorAdded(formData);
        setFormData({
            id: generateNewId(),
            firstName: "",
            lastName: "",
            email: "",
            role: "DOCTOR_PERM",
            phoneNo: "+94",

        });
        console.log(formData);
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
                    name="phoneNo"    
                    value={formData.phoneNo}

                    onChange={handleTextChange}
                    margin="normal"
                    required
                    error={!!phoneError}
                    helperText={phoneError}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                        name="role"
                        value={formData.role}
                        onChange={(e) => handleSelectChange}
                    >
                        <MenuItem value="DOCTOR_PERM">Permanent</MenuItem>
                        <MenuItem value="DOCTOR_TEMP">Temporary</MenuItem>  /
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
