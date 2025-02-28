import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../assests/logo.png"; 

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  Divider,
  Toolbar,
} from "@mui/material";
import {
  CalendarMonth,
  Dashboard,
  Groups,
  ListAlt,
  Logout,
  Payment,
} from "@mui/icons-material";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e0e0e0",
  },
});

const Logo = styled("img")({
  height: "32px",
  margin: "24px",
});

const MenuSection = styled(Box)({
  "& .section-title": {
    fontSize: "12px",
    fontWeight: 600,
    color: "#666",
    padding: "0 16px",
    marginTop: "16px",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
});

const menuItems = [
  {
    section: "Main Menu",
    items: [
      { text: "Dashboard", icon: <Dashboard />, route: "/dashboard" },
      { text: "Doctors' Roster", icon: <ListAlt />, route: "/doctors" },
      { text: "Nurses' Roster", icon: <ListAlt />, route: "/nurses" },
      { text: "Employees", icon: <Groups />, route: "/employees" },
    ],
  },
  {
    section: "Other Menu",
    items: [
      { text: "Schedules", icon: <CalendarMonth />, route: "/schedules" },
      { text: "Approval", icon: <ListAlt />, route: "/approval" },
      { text: "Payroll", icon: <Payment />, route: "/payroll" },
    ],
  },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems
      .flatMap(section => section.items)
      .find(item => item.route === currentPath);
    if (currentItem) {
      setSelectedItem(currentItem.text);
    }
  }, [location]);

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar>
        <Logo src={logo} alt="ShiftSL Logo" />
      </Toolbar>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {menuItems.map((section) => (
          <MenuSection key={section.section}>
            <Typography className="section-title">{section.section}</Typography>
            <List>
              {section.items.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={selectedItem === item.text}
                    onClick={() => {
                      setSelectedItem(item.text);
                      navigate(item.route);
                    }}
                    sx={{
                      margin: "4px 8px",
                      borderRadius: "8px",
                      "&.Mui-selected": {
                        backgroundColor: "rgba(42, 237, 141, 0.1)",
                        color: "#131313",
                        "&:hover": {
                          backgroundColor: "rgba(42, 237, 141, 0.2)",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "40px",
                        color: "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </MenuSection>
        ))}

        <Box sx={{ marginTop: "auto", mb: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                margin: "4px 8px",
                borderRadius: "8px",
                color: "#ef4444",
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                },
              }}
              onClick={() => navigate("/")}
            >
              <ListItemIcon sx={{ minWidth: "40px", color: "inherit" }}>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Log out"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </StyledDrawer>
  );
};

export default Navbar;