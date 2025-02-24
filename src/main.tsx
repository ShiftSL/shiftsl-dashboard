// filepath: /c:/Users/Ojitha Rajapaksha/OneDrive/Desktop/ShiftSL Frontend/shiftsl-dashboard/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import App from "./App";
import './CSS/index.css'; 

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <CssBaseline />
        <App />
    </React.StrictMode>
);