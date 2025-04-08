import React from "react";
import { Box, Typography, Toolbar, Paper, Zoom } from "@mui/material";
import { Construction } from "@mui/icons-material";

const drawerWidth = 240;

const Future: React.FC = () => {
    return (
        <Box
            sx={{
                padding: 4,
                minHeight: "100vh",
                backgroundColor: "#f9f9f9",
            }}
        >
            <Toolbar />

            <Zoom in>
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 500,
                        margin: "auto",
                        padding: 5,
                        textAlign: "center",
                        borderRadius: 4,
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Construction
                        sx={{ fontSize: 60, color: "#FF9800", mb: 2 }}
                    />

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Feature Under Construction
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        This section is currently being built or restricted to HR personnel only.
                    </Typography>
                </Paper>
            </Zoom>
        </Box>
    );
};

export default Future;