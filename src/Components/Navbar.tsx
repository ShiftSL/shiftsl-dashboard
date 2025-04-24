import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
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
  BarChart,
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
      { text: "Employees", icon: <Groups />, route: "/employees" },
      { text: "Analytics", icon: <BarChart />, route: "/analytics" },
    ],
  },
  {
    section: "Other",
    items: [
      { text: "Schedules", icon: <CalendarMonth />, route: "/schedules" },
      { text: "Approval", icon: <ListAlt />, route: "/approval" },
      { text: "Payroll", icon: <Payment />, route: "/payroll" },
    ],
  },
];

const Navbar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const navigate = useNavigate();
  useEffect(() => {
    const currentPath = location.pathname;

    // Find the menu item that matches the current path
    for (const section of menuItems) {
      for (const item of section.items) {
        if (item.route === currentPath) {
          setSelectedItem(item.text);
          return;
        }
      }
    }

    // If no match is found (e.g., on first load at root path), default to Dashboard
    if (currentPath === "/") {
      setSelectedItem("Dashboard");
    }});

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar>
        <Logo src={logo as string} alt="ShiftSL Logo" />
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
              onClick={() => {
                // Perform any logout logic
                navigate("/login");
              }}
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