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
        TableContainer, Paper, TableHead, TableRow, TableCell, Table, TableBody, Modal,
        TextField
    } from "@mui/material";
    import FilterListIcon from '@mui/icons-material/FilterList';
    import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
    import "../CSS/Employees.css";
    import nursedata from '../assests/nurses.json'
  
    // creating a nurse interface to make sure data is updated properly
    import {Nurse} from "../Interfaces/Nurse.tsx"
    import AddNurse from "../Components/AddNurse.tsx";
    import NurseAdminData from '../assests/NurseAdmins.json';

    const NurseEmployees: React.FC = () => {
        const [ward, setWard] = React.useState<number| string>(""); //ward state set to a number or empty string if not selected
        // To set the ward
    
        const handleWardChange = (event: SelectChangeEvent) => {
            setWard(event.target.value);
        };
    
        // Fetching Employee Data. For now from a JSON
    
        const [nurses, setNurses] = React.useState<Nurse[]>([]); // initial state set to an empty list of Nurses
        const [admins, setAdmins] = React.useState<Nurse[]>([]);
        const[showAdmins, setShowAdmins] = React.useState(false); // to show the admins

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

        useEffect(() => {
            const savedAdmins = localStorage.getItem("admins") // fetches admins json
            if(savedAdmins){
                setAdmins(JSON.parse(savedAdmins).map(admin => ({
                    ...admin,
                    id: BigInt(admin.id)
                }))); // Setting admin Data from the JSON // TODO: Later fetch this from a GET API
            }
            else {
                setAdmins(NurseAdminData.map(admin =>({
                    ...admin,
                    id:BigInt((admin.id))
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
        
        //state for search in filtering
        const [search, setSearch] = React.useState("");

        //state to show search bar
        const [showSearch, setShowSearch] = React.useState(false);

        //function for search
        const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
        };

        //function to toggle search bar
        const toggleSearch = () => {
            setShowSearch((prev) => !prev); //show search bar according to previous state
        };

        //filter nurse employees and admins
        const filteredList= (showAdmins? admins: nurses).filter((person) => {
            if(ward!=="all" && ward!=="" && person.ward!==ward) return false; //only filter by ward is ward is selected
            return person.first_name.toLowerCase().includes(search.toLowerCase()) || //case insensitive
            person.last_name.toLowerCase().includes(search.toLowerCase()) ||
            person.email.toLowerCase().includes(search.toLowerCase());
        }
        );
    
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
                        <MenuItem value="all">View All</MenuItem>
                        <MenuItem value="ward1">Ward 1</MenuItem>
                        <MenuItem value="ward2">Ward 2</MenuItem>
                        <MenuItem value="ward3">Ward 3</MenuItem>
                    </Select>
                </Box>
    
                <Box className="panel" sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                    {/*Left Section  With Members and Admins*/}
                    <Box sx={{ display: "flex", gap: 2 }}> 
                        {/*toggle between nurses and admins*/}
                        <Button className="panel-btn"  sx={{
                            color: showAdmins? "inherit": "#2AED8D", //if admins tab is active show default color
                            borderColor: "#2AED8D",
                            backgroundColor: showAdmins? "inherit":"#2AED8D !important",
                            "&:hover": {
                                backgroundColor: showAdmins? "inherit":"#28C77F!important",
    
                            },
                        }
                        }
                        onClick={()=>setShowAdmins(false)}
                        > Members </Button>
                        {/*<Divider orientation="vertical" sx={{height:"100%",mx:2}}/>*/}
                        {/*TODO: Not Showing properly check*/}
                        <Button
                            className="panel-btn"  sx={{
                                color: showAdmins? "inherit": "#2AED8D", //if admins tab is active show default color
                                borderColor: "#2AED8D",
                                backgroundColor: showAdmins? "#2AED8D !important":"inherit",
                                "&:hover": {
                                    backgroundColor: showAdmins? "#28C77F!important":"inherit",
        
                                },
                            }
                        }
                        onClick={()=>setShowAdmins(true)}
                        >Admins</Button>
    
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

                        
                        <Button variant="outlined" startIcon={<FilterListIcon />} onClick={toggleSearch} className="panel-btn"  sx={{
                            color: "#2AED8D",
                            borderColor: "#2AED8D",
                            backgroundColor: "#2AED8D !important",
                            "&:hover": {
                                backgroundColor: "#28C77F!important",
    
                            },
                        }}>Filter</Button>
                        {/*Search text for filter*/}
                        {showSearch &&(
                            <TextField
                            variant="outlined"
                            placeholder="Search by name or email"
                            value={search}
                            onChange={handleSearch}
                            size='small'
                            sx={{width: 200}}
                        
                        />
                        )}
                        
    
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
                                {/* {(showAdmins?admins:nurses).map((person)=>( */}
                                {filteredList.map((person)=>(
                                
                                    <TableRow sx={{backgroundColor: "#FDFDFD"}} key={person.id}>
                                        <TableCell>{person.id.toString()}</TableCell>
                                        <TableCell>{person.first_name}</TableCell>
                                        <TableCell>{person.last_name}</TableCell>
                                        <TableCell>{person.phone_no}</TableCell>
                                        <TableCell>{person.email}</TableCell>
                                        <TableCell>{person.role}</TableCell>
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
    