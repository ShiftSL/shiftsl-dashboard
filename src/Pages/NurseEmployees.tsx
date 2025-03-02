/*
    Showcases the main list of Employees available in the ward
    Functionalities: Fetches the Doctors from the backend and showcases them
    Can add new Doctors
 */

    import "../Components/AddEmployee.tsx"
    // TODO: The Add Doctor Form Needs to Be checked
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
    import nursedata from '../assests/nurses.json'
    // creating a doctor interface to make sure data is updated properly
    import {Nurse} from "../Interfaces/Nurse.tsx"
    import AddNurse from "../Components/AddNurse.tsx";

    const NurseEmployees: React.FC = () => {
        const [ward, setWard] = React.useState("");
        // To set the ward
    
        const handleWardChange = (event: SelectChangeEvent) => {
            setWard(event.target.value);
        };
    
        // Fetching Employee Data. For now from a JSON
    
        const [nurses, setNurses] = React.useState<Nurse[]>([]); // initial state set to an empty list of Nurses
        useEffect(() => {
            const savedNurses = localStorage.getItem("nurses") // fetches nurses json
            if(savedNurses){
                setNurses(JSON.parse(savedNurses).map(nurse => ({
                    ...nurse,
                    id: BigInt(nurse.id)
                }))); // Setting nurse Data from the JSON // TODO: Later fetch this from a GET API
            }
            else {
                setNurses(nursedata.map(nurse =>({
                    ...nurse,
                    id:BigInt((nurse.id))
                })))
            }
    
        }, []);
    
        const [addForm, setAddForm] = React.useState(false)
        const handleNurseAdded=(newNurse: Nurse) =>{
            const updatedNurses = [...nurses, newNurse];
            setNurses(updatedNurses);
            localStorage.setItem("nurses", JSON.stringify(updatedNurses.map(nurse =>({
                ...nurse,
                id: nurse.id.toString()
            }) )))
            setAddForm(false);
            console.log("New Nurse Added: " +newNurse.id,+" "+newNurse.first_name, +" "+newNurse.last_name,+" " +newNurse.email, +newNurse.email);
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
                        <Typography variant="h6">Nurses List</Typography>
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
                                onClick={()=>setAddForm(true)}
                        >
                            Add New
                        </Button>
    
                        <Modal open={addForm} onClose={()=>setAddForm(false)}>
                            <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 3, borderRadius: 2}}>
                            <AddNurse onNurseAdded={handleNurseAdded}/>
                            </Box>
                        </Modal>
    
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
                                {nurses.map((nurse)=>(
                                    <TableRow sx={{backgroundColor: "#FDFDFD"}} key={nurse.id}>
                                        <TableCell>{nurse.id.toString()}</TableCell>
                                        <TableCell>{nurse.first_name}</TableCell>
                                        <TableCell>{nurse.last_name}</TableCell>
                                        <TableCell>{nurse.phone_no}</TableCell>
                                        <TableCell>{nurse.email}</TableCell>
                                        <TableCell>{nurse.role}</TableCell>
                                    </TableRow>
                                ))}
    
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        );
    };
    
    export default NurseEmployees;
    