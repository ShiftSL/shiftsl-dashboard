import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Table,
    TableBody,
    Modal
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../CSS/Employees.css";
import AddEmployee from "../components/AddEmployee";
import { auth } from '../firebase/config'; // Import Firebase Auth
import { userApi } from "../services/api";
import { User, UserDTO } from "../Interfaces/User";

const Employees: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // User state
    const [addForm, setAddForm] = useState(false); // State to manage the add form

    // Fetch users on component mount using the userApi service
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userApi.getAllUsers();
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        fetchUsers();
    }, []); // No dependency since this should run once on mount

    // Handle adding a new user (including Firebase Authentication account creation)
    const handleUserAdded = async (newUser: UserDTO) => {

        userApi.createUser(newUser);
        setAddForm(false); // Close the add form

    };

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
                    <Typography variant="h6">Employee List</Typography>
                </Grid>
            </Grid>

            <Box className="panel" sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button className="panel-btn" sx={{
                        color: "#2AED8D",
                        borderColor: "#2AED8D",
                        backgroundColor: "#2AED8D !important",
                        "&:hover": { backgroundColor: "#28C77F!important" },
                    }}> Members </Button>
                    <Button>Admins</Button>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        className="panel-btn"
                        sx={{
                            color: "#2AED8D",
                            borderColor: "#2AED8D",
                            backgroundColor: "#2AED8D !important",
                            "&:hover": { backgroundColor: "#28C77F!important" },
                        }}
                        onClick={() => setAddForm(true)} // Open add employee form
                    >
                        Add New
                    </Button>

                    <Modal open={addForm} onClose={() => setAddForm(false)}>
                        <Box sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            p: 3,
                            borderRadius: 2,
                        }}>
                            <AddEmployee onUserAdded={handleUserAdded} />
                        </Box>
                    </Modal>

                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        className="panel-btn"
                        sx={{
                            color: "#2AED8D",
                            borderColor: "#2AED8D",
                            backgroundColor: "#2AED8D !important",
                            "&:hover": { backgroundColor: "#28C77F!important" },
                        }}
                    >
                        Filter
                    </Button>
                </Box>
            </Box>

            <Box className="List" sx={{ padding: "20px", width: "100%" }}>
                <TableContainer sx={{ maxWidth: "100%" }}>
                    <Table size="medium">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>#ID</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>First Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>Last Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>Mobile</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>User Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow sx={{ backgroundColor: "#FDFDFD" }} key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.phoneNo}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
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
