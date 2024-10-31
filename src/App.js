import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Api
import { AUTH_API } from "./api";

// Assets
import { ADMIN_ROUTES, ROUTES } from "./routes";

// Components
import { Layout } from "./components";

// Contexts
import { SessionContext } from "./providers";

// Utils
import { setToStorage } from "./utils";

const App = () => {
    const { state: isUserAuthenticated, setState: setSession } =
        useContext(SessionContext);

    const ProtectedRoute = ({ element }) => {
        if (!isUserAuthenticated) {
            return <Navigate to="/log-in" replace />;
        }

        return element;
    };

    async function getDataHandler() {
        const res = await AUTH_API.checkSession();
        if (!res) setSession(null);
        else {
            setSession(res);
            setToStorage("session", res);
        }
    }

    useEffect(() => {
        getDataHandler();

        // eslint-disable-next-line
    }, []);

    return (
        <Layout>
            <Routes>
                {ROUTES.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            route.path === "/log-in" && isUserAuthenticated ? (
                                <Navigate to="/admin" replace />
                            ) : (
                                route.element
                            )
                        }
                    />
                ))}
                {ADMIN_ROUTES.map((adminRoute) => (
                    <Route
                        key={adminRoute.path}
                        path={adminRoute.path}
                        element={
                            <ProtectedRoute>
                                {adminRoute.element}
                            </ProtectedRoute>
                        }
                    />
                ))}
            </Routes>
        </Layout>
    );
};

export default App;
