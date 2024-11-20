import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Assets
import "./index.css";

// Components
import App from "./App";

// Providers
import { SnackbarProvider } from "./providers";

const root = createRoot(document.getElementById("root") as HTMLElement);

const app = (
    <StrictMode>
        <Router
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </Router>
    </StrictMode>
);

root.render(app);
