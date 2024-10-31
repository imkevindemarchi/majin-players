import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Assets
import "./index.css";

// Components
import App from "./App";

const root = createRoot(document.getElementById("root"));

const app = (
    <StrictMode>
        <Router>
            <App />
        </Router>
    </StrictMode>
);

root.render(app);
