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
    import nursedata from '../jsonfiles/nurses.json'
    import doctordata from '../jsonfiles/doctors.json'
  
    // creating a nurse interface to make sure data is updated properly
    import {Employee} from "../Interfaces/Employee.tsx"
    import AddEmployee from "../Components/AddEmployee.tsx";
    import NurseAdminData from '../jsonfiles/NurseAdmins.json';
    import DoctorAdminData from '../jsonfiles/DoctorAdmins.json';

    //Dynamically assign employee type
    interface EmployeeProps {
        employeeType: "doctor" | "nurse";
    }

    const Employees: React.FC <EmployeeProps>= ({ employeeType }) => {
        const [ward, setWard] = React.useState<number| string>(""); //ward state set to a number or empty string if not selected
        console.log("employeeType:", employeeType);
        // To set the ward
    
        const handleWardChange = (event: SelectChangeEvent) => {
            setWard(event.target.value);
        };
    
        // Fetching Employee Data. For now from a JSON
    
        const [employees, setEmployees] = React.useState<Employee[]>([]); //state for employees
        const [admins, setAdmins] = React.useState<Employee[]>([]); //admin list
        const[showAdmins, setShowAdmins] = React.useState(false); // to show the admins
        

        // useEffect(() => {
        //     if (employeeType === "nurse") {
        //         const savedNurses = localStorage.getItem("nurses") // fetches nurses json
        //         if(savedNurses){
        //             setEmployees(JSON.parse(savedNurses).map((nurse :Employee) => ({
        //                 ...nurse,
        //                 id: BigInt(nurse.id)
        //             }))); // Setting nurse Data from the JSON // TODO: Later fetch this from a GET API
        //         } else {
        //             setEmployees(nursedata.map((nurse: { id: string; first_name: string; last_name: string; email: string; role: string; phone_no: string; ward: string; }) => ({
        //                 ...nurse,
        //                 id:BigInt((nurse.id))
        //             })))
        //         }
        //     }else if (employeeType === "doctor") {
        //         const savedDoctors = localStorage.getItem("doctors") // fetches doctors json
        //         if(savedDoctors){
        //             setEmployees(JSON.parse(savedDoctors).map((doctor :Employee) => ({
        //                 ...doctor,
        //                 id: BigInt(doctor.id)
        //             }))); // Setting doctor Data from the JSON // TODO: Later fetch this from a GET API
        //         } else {
        //             setEmployees(doctordata.map((doctor: { id: string; first_name: string; last_name: string; email: string; role: string; phone_no: string; ward: string; }) => ({
        //                 ...doctor,
        //                 id:BigInt((doctor.id))
        //             }))
        //             );
        //         }
        //     }
    
        // }, [employeeType]);
        // useEffect(() => {
        //     const fetchEmployeeData = async () => {
        //         let employeeData;
        //         let adminData;
        
        //         if (employeeType === "nurse") {
        //             employeeData = JSON.parse(localStorage.getItem("nurses") || "[]") || nursedata;
        //             adminData = JSON.parse(localStorage.getItem("NurseAdmins") || "[]") || NurseAdminData;
        //         } else if (employeeType === "doctor") {
        //             employeeData = JSON.parse(localStorage.getItem("doctors") || "[]") || doctordata;
        //             adminData = JSON.parse(localStorage.getItem("DoctorAdmins") || "[]") || DoctorAdminData;
        //         }
        
        //         setEmployees(employeeData.map((employee: Employee) => ({
        //             ...employee,
        //             id: BigInt(employee.id)
        //         })));
        
        //         setAdmins(adminData.map((admin: Employee) => ({
        //             ...admin,
        //             id: BigInt(admin.id)
        //         })));
        //     };
        
        //     fetchEmployeeData();
        // }, [employeeType]); 
      
        useEffect(() => {
            const fetchEmployeeData = async () => {
                let employeeData = [];
                let adminData = [];
        
                // Handling nurse or doctor employee types
                if (employeeType === "nurse") {
                    // Fetch saved employee and admin data from local storage
                    const savedEmployeeData = localStorage.getItem("nurses");
                    const savedAdminData = localStorage.getItem("NurseAdmins");
        
                    employeeData = savedEmployeeData ? JSON.parse(savedEmployeeData) : nursedata;
                    adminData = savedAdminData ? JSON.parse(savedAdminData) : NurseAdminData;
                } else if (employeeType === "doctor") {
                    const savedEmployeeData = localStorage.getItem("doctors");
                    const savedAdminData = localStorage.getItem("DoctorAdmins");
        
                    employeeData = savedEmployeeData ? JSON.parse(savedEmployeeData) : doctordata;
                    adminData = savedAdminData ? JSON.parse(savedAdminData) : DoctorAdminData;
                }
        
                // Ensure each employee/admin has the id as BigInt, or just leave it as is if not needed
                setEmployees(
                    employeeData.map((employee) => ({
                        ...employee,
                        // id: employee.id ? BigInt(employee.id) : employee.id, 
                        id:BigInt(employee.id) || employee.id,
                    }))
                );
        
                setAdmins(
                    adminData.map((admin) => ({
                        ...admin,
                        // id: admin.id ? BigInt(admin.id) : admin.id, 
                        id:BigInt(admin.id) || admin.id,
                    }))
                );
            };
        
            fetchEmployeeData();
        }, [employeeType]);

        // useEffect(() => {
        //     if (employeeType === "nurse") {
        //         const savedAdmins = localStorage.getItem("NurseAdmins") // fetches  Nurse admins json
        //         if(savedAdmins){
        //             setAdmins(JSON.parse(savedAdmins).map((admin:Employee) => ({
        //                 ...admin,
        //                 id: BigInt(admin.id)
        //             }))); // Setting admin Data from the JSON // TODO: Later fetch this from a GET API
        //         }
        //     else {
        //         setAdmins(NurseAdminData.map((admin: { id: string; first_name: string; last_name: string; email: string; role: string; phone_no: string; ward: string; }) =>({
        //             ...admin,
        //             id:BigInt((admin.id))
        //         })))
        //     }
        // }else if (employeeType === "doctor") {
        //     const savedAdmins = localStorage.getItem("DoctorAdmins") // fetches  Doctor admins json
        //     if(savedAdmins){
        //         setAdmins(JSON.parse(savedAdmins).map((admin:Employee) => ({
        //             ...admin,
        //             id: BigInt(admin.id)
        //         }))); // Setting admin Data from the JSON // TODO: Later fetch this from a GET API
        //     }
        //     else {
        //         setAdmins(DoctorAdminData.map((admin: { id: string; first_name: string; last_name: string; email: string; role: string; phone_no: string; ward: string; }) => ({
        //             ...admin,
        //             id:BigInt((admin.id))
        //         }))
        //         );
        //     }
        // }
    
        // }, [employeeType]);
    
        const [addForm, setAddForm] = React.useState(false)

        // const handleEmployeeAdded=(newEmployee: Employee) =>{
            
        //     const updatedEmployee = [...employees, newEmployee];
        //         setEmployees(updatedEmployee);
        //         localStorage.setItem(employeeType==="nurse"?"nurses":"doctors", JSON.stringify(updatedEmployee.map(employee =>({
        //         ...employee,
        //         id: employee.id.toString()
        //     }) )));
        //     console.log(`New ${employeeType}Added: ${newEmployee.id} ${newEmployee.first_name} ${newEmployee.last_name} ${newEmployee.email}`);
        // };
           
        //     setAddForm(false);
        const handleEmployeeAdded = (newEmployee: Employee) => {
            
            setEmployees((prevEmployees) => {
                const updatedEmployees = [...prevEmployees, newEmployee];
                localStorage.setItem(employeeType === "nurse" ? "nurses" : "doctors", 
                    JSON.stringify(updatedEmployees.map((employee) => ({
                        ...employee,
                        id: employee.id.toString()
                    })))
                );
                return updatedEmployees;  // Return updated state directly to avoid unnecessary re-rendering
            });
        };
            
        
        
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
        // const filteredList= (showAdmins? admins: employees).filter((person) => {
        //     if(ward!=="all" && ward!=="" && person.ward!==ward) return false; //only filter by ward is ward is selected
        //     return person.first_name.toLowerCase().includes(search.toLowerCase()) || //case insensitive
        //     person.last_name.toLowerCase().includes(search.toLowerCase()) ||
        //     person.email.toLowerCase().includes(search.toLowerCase());
        // }
        // );

        const filteredList = React.useMemo(() => {
            return (showAdmins ? admins : employees).filter((person) => {
                if (ward !== "all" && ward !== "" && person.ward !== ward) return false;
                return (
                    person.first_name.toLowerCase().includes(search.toLowerCase()) ||
                    person.last_name.toLowerCase().includes(search.toLowerCase()) ||
                    person.email.toLowerCase().includes(search.toLowerCase())
                );
            });
        }, [showAdmins, employees, admins, ward, search]);
    
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
                        <Typography variant="h6">{employeeType==="nurse"? "nurses":"Doctors"} List </Typography>
                    </Grid>
                </Grid>
    
    
                <Box className="ward" sx={{ marginTop: "10px" }}>
                    <Select
                        value={String(ward)}
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
                            <AddEmployee type={employeeType} onEmployeeAdded={handleEmployeeAdded}/>
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
    
    export default Employees;
    