import React from "react";
import { Route, Routes } from "react-router-dom";

// Assets
import { ROUTES } from "./routes";

// Components
import { Layout } from "./components";

const App = () => {
    return (
        <Layout>
            <Routes>
                {ROUTES.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </Layout>
    );
};

export default App;
