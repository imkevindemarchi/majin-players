import { createContext, useState } from "react";

export const SnackbarContext = createContext();

const initialState = {
    isOpen: false,
    message: "",
    type: "",
};

export const SnackbarProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    function closeHandler() {
        setState((prevState) => ({ ...prevState, isOpen: false }));

        setTimeout(() => {
            setState((prevState) => ({
                ...prevState,
                isOpen: false,
                message: "",
                type: "",
            }));
        }, 1000);
    }

    function stateHandler(message, type) {
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
        <SnackbarContext.Provider value={{ state, stateHandler, closeHandler }}>
            {children}
        </SnackbarContext.Provider>
    );
};
