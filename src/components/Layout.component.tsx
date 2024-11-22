import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Api
import { AUTH_API } from "../api";

// Assets
import { ADMIN_ROUTES, ROUTES } from "../routes";

// Components
import Loader from "./Loader.component";
import Snackbar from "./Snackbar.component";
import Navbar from "./Navbar.component";
import Hamburger from "./Hamburger.component";
import Sidebar from "./Sidebar.component";

// Contexts
import {
    AuthContext,
    LoaderContext,
    SidebarContext,
    SnackbarContext,
    ThemeContext,
} from "../providers";

// Types
import {
    AuthContextI,
    LayoutI,
    LoaderContextI,
    SidebarContextI,
    SnackbarContextI,
    ThemeContextI,
} from "../types";

// Utilities
import { removeFromStorage } from "../utilities";

const Layout: FC<LayoutI> = ({ isAdminSection, pathname, children }) => {
    const { state: isLoading } = useContext(LoaderContext) as LoaderContextI;
    const { state: snackbarState, closeHandler: closeSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;
    const { state: theme, stateHandler: themeHandler } = useContext(
        ThemeContext
    ) as ThemeContextI;
    const { setState: setIsLoading } = useContext(
        LoaderContext
    ) as LoaderContextI;
    const { setSession } = useContext(AuthContext) as AuthContextI;
    const { activeHandler: activeSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;
    const { state: sidebarState, stateHandler: sidebarHandler } = useContext(
        SidebarContext
    ) as SidebarContextI;

    const isLoginPage = pathname.split("/")[1] === "log-in";
    const isStyleGuidePage = pathname.split("/")[1] === "style-guide";
    const urlSection = isAdminSection
        ? pathname.split("/")[2]
        : pathname.split("/")[1];
    const routes = isAdminSection ? ADMIN_ROUTES : ROUTES;
    const isDarkMode = theme === "dark";
    const navigate = useNavigate();

    async function logoutHandler() {
        setIsLoading(true);

        const res = await AUTH_API.logout();
        if (res) {
            setSession(null);
            removeFromStorage("session");
            navigate("/log-in");
        } else activeSnackbar("Impossibile effettuare il log out", "error");

        setIsLoading(false);
    }

    const navbar = !isLoginPage && !isStyleGuidePage && (
        <Navbar
            isAdminSection={isAdminSection}
            urlSection={urlSection}
            routes={routes}
            isDarkMode={isDarkMode}
            themeHandler={themeHandler}
            logoutHandler={logoutHandler}
        />
    );

    const sidebar = (
        <Sidebar
            isAdminSection={isAdminSection}
            urlSection={urlSection}
            routes={routes}
            isDarkMode={isDarkMode}
            themeHandler={themeHandler}
            logoutHandler={logoutHandler}
            isActive={sidebarState}
            stateHandler={sidebarHandler}
        />
    );

    const hamburger = !isLoginPage && (
        <Hamburger
            isActive={sidebarState}
            onClick={sidebarHandler}
            isDarkMode={isDarkMode}
        />
    );

    const loader = <Loader isOpen={isLoading} />;

    const snackbar = <Snackbar state={snackbarState} onClose={closeSnackbar} />;

    return (
        <div
            className={`w-full min-h-[100vh] 
                ${isDarkMode ? "bg-black" : "bg-white"}
            `}
        >
            {navbar}
            {sidebar}
            {hamburger}
            <div
                className={
                    !isStyleGuidePage
                        ? "px-96 mobile:px-5 py-56 mobile:py-28"
                        : ""
                }
            >
                {children}
            </div>
            {loader}
            {snackbar}
        </div>
    );
};

export default Layout;
