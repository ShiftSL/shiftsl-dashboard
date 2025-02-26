import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import logo from "../assests/logo.png"; // Adjust path as needed


import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider, Toolbar } from "@mui/material";
import {Menu} from "@mui/icons-material"
import PersonIcon from '@mui/icons-material/Person';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(true);
    const toggleDrawer=()=>{setOpen(!open)} // closes the navbar when called
    const menuItems = [
        {text: "Dashboard", icon: <Menu/>, route: "/dashboard" },
        {text:"Employees", icon:<PersonIcon/>, route: "/employees"},
        {text: "Approval", icon: <AccessAlarmIcon/>, route: "/approve"}
    ];
    return(
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open ? 240 : 60,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: open ? 240 : 60,
                    transition: "width 0.3s ease-in-out",
                    overflowX: "hidden",
                },
            }}
        >
            <Toolbar>
                <IconButton onClick={toggleDrawer}>
                   <img src={logo} alt="logo"/>
                {/*   TODO:  Make the logo without shiftsl appear when drawer is closed*/}
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map(({ text, icon, route }) => (
                    <ListItemButton key={text} onClick={() => navigate(route)}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        {open && <ListItemText primary={text} />}
                    </ListItemButton>
                ))}
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={() => navigate("/")}>
                    <ListItemIcon>
                        {/*<Logout />*/}
                    </ListItemIcon>
                    {open && <ListItemText primary="Logout" />}
                </ListItemButton>
            </List>
        </Drawer>
    );
}
export default Navbar;