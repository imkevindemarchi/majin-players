import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Assets
import "./index.css";

// Components
import App from "./App";

// Providers
import { SessionProvider, SnackbarProvider } from "./providers";

const root = createRoot(document.getElementById("root"));

const app = (
    <StrictMode>
        <Router>
            <SnackbarProvider>
                <SessionProvider>
                    <App />
                </SessionProvider>
            </SnackbarProvider>
        </Router>
    </StrictMode>
);

root.render(app);
