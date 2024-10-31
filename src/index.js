import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Assets
import "./index.css";

// Components
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "./providers";

const root = createRoot(document.getElementById("root"));

const app = (
    <StrictMode>
        <Router>
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </Router>
    </StrictMode>
);

root.render(app);
