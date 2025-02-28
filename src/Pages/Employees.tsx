/*
    Showcases the main list of Employees available in the ward
    Functionalities: Fetches the Doctors from the backend and showcases them
    Can add new Doctors
 */

// import "../Components/AddEmployee.tsx" TODO: The Add Doctor Form Needs to Be checked
import React, {useEffect} from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TableContainer, Paper, TableHead, TableRow, TableCell, Table, TableBody, Modal
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../CSS/Employees.css";
import doctordata from '../assests/doctors.json'
// creating a doctor interface to make sure data is updated properly
import {Doctor} from "../Interfaces/Doctor.tsx"
const Employees: React.FC = () => {
    const [ward, setWard] = React.useState("");
    // To set the ward

    const handleWardChange = (event: SelectChangeEvent) => {
        setWard(event.target.value);
    };

    // Fetching Employee Data. For now from a JSON

    const [doctors, setDoctors] = React.useState<Doctor[]>([]); // initial state set to an empty list of doctors
    useEffect(() => {
        setDoctors(doctordata.map(doctor => ({
            ...doctor,
            id: BigInt(doctor.id)
        }))); // Setting Doctor Data from the JSON // TODO: Later fetch this from a GET API
    }, []);

    const [addForm, showAddForm] = React.useState(false)
    const handleDoctorAdded=(newDoctor: any) =>{
        console.log("New Doc Added: " +newDoctor);
        showAddForm(false);
    }

    return (
        <Box sx={{ width: "100%", padding: "20px" }}>
            <Grid container alignItems="center" spacing={1} className="heading">
                <Grid item>
                    <Typography variant="h5" fontWeight="bold">
                        Employees
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">≫</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Doctor's List</Typography>
                </Grid>
            </Grid>


            <Box className="ward" sx={{ marginTop: "10px" }}>
                <Select
                    value={ward}
                    onChange={handleWardChange}
                    displayEmpty
                    sx={{ width: 160, fontSize: "1rem", fontFamily: "inter", fontWeight:600, padding: "1px" }}
                >
                    <MenuItem value="" disabled>Select Ward</MenuItem>
                    <MenuItem value="ward1">Ward 1</MenuItem>
                    <MenuItem value="ward2">Ward 2</MenuItem>
                    <MenuItem value="ward3">Ward 3</MenuItem>
                </Select>
            </Box>

            <Box className="panel" sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                {/*Left Section  With Members and Admins*/}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button className="panel-btn"  sx={{
                        color: "#2AED8D",
                        borderColor: "#2AED8D",
                        backgroundColor: "#2AED8D !important",
                        "&:hover": {
                            backgroundColor: "#28C77F!important",

                        },
                    }}> Members </Button>
                    {/*<Divider orientation="vertical" sx={{height:"100%",mx:2}}/>*/}
                    {/*TODO: Not Showing properly check*/}
                    <Button>Admins</Button>

                </Box>

                {/* Right Section contains Add & Filter */}
                {/* Displays a form onClick, and You can Add A Doctor to the List*/}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="contained" startIcon={<AddCircleOutlineIcon />} className="panel-btn"  sx={{
                        color: "#2AED8D",
                        borderColor: "#2AED8D",
                        backgroundColor: "#2AED8D !important",
                        "&:hover": {
                            backgroundColor: "#28C77F!important",
                        },
                    }}
                           
                    >
                        Add New
                    </Button>
                    {/*<Modal open={addForm} onClose={() => showAddForm(false)}>*/}
                    {/*    <Box sx={{*/}
                    {/*        position: "absolute",*/}
                    {/*        top: "50%",*/}
                    {/*        left: "50%",*/}
                    {/*        transform: "translate(-50%, -50%)",*/}
                    {/*        bgcolor: "background.paper",*/}
                    {/*        boxShadow: 24,*/}
                    {/*        p: 3,*/}
                    {/*        borderRadius: 2*/}
                    {/*    }}>*/}
                    {/*        <AddEmployee onDoctorAdded={handleDoctorAdded} />*/}
                    {/*    </Box>*/}
                    {/*</Modal>*/}
                    <Button variant="outlined" startIcon={<FilterListIcon />} className="panel-btn"  sx={{
                        color: "#2AED8D",
                        borderColor: "#2AED8D",
                        backgroundColor: "#2AED8D !important",
                        "&:hover": {
                            backgroundColor: "#28C77F!important",

                        },
                    }}>Filter</Button>
                </Box>
            </Box>
            <Box className="List" sx={{ padding: "20px", width: "100%"} }>
                <TableContainer  sx={{ maxWidth: "100%"}}>
                    <Table size="medium">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "14px" , padding:"20px"}}>#ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "14px" , padding:"20px"}}>First Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "14px" , padding:"20px"}}>Last Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "14px" , padding:"20px"}}>Mobile</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "14px" , padding:"20px"}}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "14px" , padding:"20px"}}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {doctors.map((doctor)=>(
                                <TableRow sx={{backgroundColor: "#FDFDFD"}} key={doctor.id}>
                                    <TableCell>{doctor.id}</TableCell>
                                    <TableCell>{doctor.first_name}</TableCell>
                                    <TableCell>{doctor.last_name}</TableCell>
                                    <TableCell>{doctor.phone_no}</TableCell>
                                    <TableCell>{doctor.email}</TableCell>
                                    <TableCell>{doctor.role}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Employees;
