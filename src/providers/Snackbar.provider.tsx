import { createContext, useState } from "react";

// Types
import {
    SnackbarContextType,
    SnackbarMessageType,
    SnackbarProviderType,
    SnackbarStateType,
} from "../types";

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: SnackbarProviderType) => {
    const [state, setState] = useState<SnackbarStateType>({
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

    function activeHandler(message: string, type: SnackbarMessageType) {
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
