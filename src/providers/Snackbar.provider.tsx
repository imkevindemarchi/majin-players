import { createContext, useState } from "react";

// Types
import {
    SnackbarContextInterface,
    SnackbarMessageType,
    SnackbarProviderInterface,
    SnackbarStateInterface,
} from "../types";

export const SnackbarContext = createContext<SnackbarContextInterface | null>(null);

export const SnackbarProvider = ({ children }: SnackbarProviderInterface) => {
    const [state, setState] = useState<SnackbarStateInterface>({
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
