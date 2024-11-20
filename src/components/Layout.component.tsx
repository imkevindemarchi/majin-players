import { FC, useContext } from "react";

// Assets
import { ADMIN_ROUTES, ROUTES } from "../routes";

// Components
import Loader from "./Loader.component";
import Snackbar from "./Snackbar.component";
import Navbar from "./Navbar.component";

// Contexts
import { LoaderContext, SnackbarContext } from "../providers";

// Types
import { LayoutInterface, LoaderContextInterface, SnackbarContextInterface } from "../types";

const Layout: FC<LayoutInterface> = ({ isAdminSection, pathname, children }) => {
    const { state: isLoading } = useContext(LoaderContext) as LoaderContextInterface;
    const { state: snackbarState, closeHandler: closeSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextInterface;

    const isLoginPage = pathname.split("/")[1] === "log-in";
    const urlSection = isAdminSection
        ? pathname.split("/")[2]
        : pathname.split("/")[1];
    const routes = isAdminSection ? ADMIN_ROUTES : ROUTES;

    const navbar = !isLoginPage && (
        <Navbar
            isAdminSection={isAdminSection}
            urlSection={urlSection}
            routes={routes}
        />
    );

    return (
        <div>
            {navbar}
            {children}
            <Loader isOpen={isLoading} />
            <Snackbar state={snackbarState} onClose={closeSnackbar} />
        </div>
    );
};

export default Layout;
