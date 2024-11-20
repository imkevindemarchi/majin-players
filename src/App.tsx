import { FC, ReactNode, useContext, useEffect } from "react";
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";

// Api
import { AUTH_API } from "./api";

// Components
import { Layout } from "./components";

// Contexts
import { AuthContext } from "./providers";

// Pages
import { StyleGuide, LogIn } from "./pages";

// Types
import { AuthContextType } from "./types";

// Utilities
import { removeFromStorage } from "./utilities";

const App: FC = () => {
    const { isUserAuthenticated } = useContext(AuthContext) as AuthContextType;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isAdminSection = pathname.split("/")[1] === "admin";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    async function checkSessionHandler() {
        const res = await AUTH_API.checkSession();

        if (!res || !res.value) {
            removeFromStorage("user");
            navigate("/log-in");
        }
    }

    useEffect(() => {
        if (isAdminSection && isUserAuthenticated) {
            checkSessionHandler();
        }

        // eslint-disable-next-line
    }, []);

    const ProtectedRoute = ({ children }: { children: ReactNode }): any => {
        if (!isUserAuthenticated) {
            return <Navigate to="/log-in" replace />;
        }

        return children;
    };

    const loginElement = isUserAuthenticated ? (
        <Navigate to="/admin" />
    ) : (
        <LogIn />
    );

    return (
        <Layout>
            <Routes>
                <Route path="/style-guide" element={<StyleGuide />} />
                <Route path="/log-in" element={loginElement} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <></>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Layout>
    );
};

export default App;
