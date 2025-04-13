import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, TextField, Select, MenuItem, FormControl, Typography, Paper,} from "@mui/material";
import {User, UserDTO, UserRole} from "../types/user.ts";
import { SelectChangeEvent } from "@mui/material";
import {userApi} from "../service/api.ts"; // Import SelectChangeEvent

// Define props interface
interface AddEmployeeProps {
    existingDoctor?: User| null;
    onDoctorAdded: (newDoctor: UserDTO) => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ onDoctorAdded, existingDoctor }) => {
    const [formData, setFormData] = useState<UserDTO>({
        firstName: existingDoctor?.firstName || "",
        lastName: existingDoctor?.lastName || "",
        phoneNo: existingDoctor?.phoneNo || "",
        email: existingDoctor?.email || "",
        slmcReg: existingDoctor?.slmcReg || "",
        role: existingDoctor?.role || UserRole.DOCTOR_PERM,
        firebaseUid: existingDoctor?.firebaseUid||""
    });
    useEffect(() => {
        if (existingDoctor) {
            // When editing a user, populate with their data
            setFormData({
                firstName: existingDoctor.firstName || "",
                lastName: existingDoctor.lastName || "",
                phoneNo: existingDoctor.phoneNo || "",
                email: existingDoctor.email || "",
                slmcReg: existingDoctor.slmcReg || "",
                role: existingDoctor.role || UserRole.DOCTOR_PERM,
                firebaseUid: existingDoctor.firebaseUid || ""
            });
        } else {
            // When adding a new user, reset the form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                role: UserRole.DOCTOR_PERM,
                phoneNo: "",
                slmcReg: "",
                firebaseUid: ""
            });
        }
    }, [existingDoctor]);

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        email: "",
        slmcReg: ""
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form fields
        let formErrors = {...errors};
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
        if (formData.slmcReg.length != 5) {
            formErrors.slmcReg = "SLMC Reg No Invalid Please Check";
            isValid = false;
        }

        setErrors(formErrors);

        if (isValid) {
            try {
                if (existingDoctor) {
                    const updatedUser: User = {
                        ...existingDoctor,
                        ...formData
                    };
                    try{
                        const response = await userApi.updateUser(existingDoctor.id, updatedUser);
                        console.log("Doctor Updated", response);
                        setFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            role: UserRole.DOCTOR_PERM,
                            phoneNo: "",
                            slmcReg: ""
                        });
                    }catch (error){
                        console.log("Error Updating User: ",error);
                        setFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            role: UserRole.DOCTOR_PERM,
                            phoneNo: "",
                            slmcReg: ""
                        });
                    }

                }else {
                    onDoctorAdded(formData);
                    console.log(formData);
                    // to reset the data to empty
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        role: UserRole.DOCTOR_PERM,
                        phoneNo: "",
                        slmcReg: ""
                    });
                }
            }catch (error){
                console.error("Error Adding/ Updating User: "+error)
            }
        }
    };


    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: "400px", margin: "20px auto" }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {existingDoctor ? "Update Doctor" : "Add New Doctor"}
            </Typography>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                    size="medium"
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleTextChange}
                    required
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField
                    size="medium"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleTextChange}
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                />
                <TextField
                    size="medium"
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    size="medium"
                    fullWidth
                    label="Phone Number"
                    name="phoneNo"
                    type="tel"
                    value={formData.phoneNo}
                    onChange={handleTextChange}
                    required
                    error={!!errors.phoneNo}
                    helperText={errors.phoneNo}
                />
                <TextField
                    size="medium"
                    fullWidth
                    label="SLMC Registration No"
                    name="slmcReg"
                    value={formData.slmcReg}
                    onChange={handleTextChange}
                    required
                    error={!!errors.slmcReg}
                    helperText={errors.slmcReg}
                />

                <FormControl fullWidth size="medium">
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

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {existingDoctor ? "Update Doctor" : "Add Doctor"}
                </Button>
            </form>
        </Paper>
    );
};

export default AddEmployee;
