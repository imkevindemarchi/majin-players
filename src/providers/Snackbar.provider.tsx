import { createContext, useState } from "react";

// Types
import {
    SnackbarContextI,
    SnackbarMessageT,
    SnackbarProviderI,
    SnackbarStateI,
} from "../types";

export const SnackbarContext = createContext<SnackbarContextI | null>(null);

export const SnackbarProvider = ({ children }: SnackbarProviderI) => {
    const [state, setState] = useState<SnackbarStateI>({
        isOpen: false,
        message: "Prova",
        type: "error",
    });

    function closeHandler(): void {
        setState((prevState) => ({ ...prevState, isOpen: false }));

        setTimeout(() => {
            setState((prevState) => ({
                ...prevState,
                message: null,
                type: null,
            }));
        }, 1000);
    }

    function activeHandler(message: string, type: SnackbarMessageT) {
        setState({
            isOpen: true,
            message,
            type,
        });

        setTimeout(() => {
            closeHandler();
        }, 3000);
    }

    return (
        <SnackbarContext.Provider
            value={{ state, activeHandler, closeHandler }}
        >
            {children}
        </SnackbarContext.Provider>
    );
};
