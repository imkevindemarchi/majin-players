import { FC, useContext } from "react";

// Components
import Loader from "./Loader.component";
import Snackbar from "./Snackbar.component";

// Contexts
import { LoaderContext, SnackbarContext } from "../providers";

// Types
import { LayoutType, LoaderContextType, SnackbarContextType } from "../types";

const Layout: FC<LayoutType> = ({ children }) => {
    const { state: isLoading } = useContext(LoaderContext) as LoaderContextType;
    const { state: snackbarState, closeHandler: closeSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextType;

    return (
        <div>
            {children}
            <Loader isOpen={isLoading} />
            <Snackbar state={snackbarState} onClose={closeSnackbar} />
        </div>
    );
};

export default Layout;
