import React from "react";

// Components
import Snackbar from "./Snackbar.component";

const Layout = ({ children }) => {
    const snackbar = <Snackbar />;

    return (
        <div>
            {snackbar}
            {children}
        </div>
    );
};

export default Layout;
