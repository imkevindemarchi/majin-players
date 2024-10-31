import { createContext, useState } from "react";

// Utils
import { getFromStorage } from "../utils";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [state, setState] = useState(getFromStorage("session") || null);

    return (
        <SessionContext.Provider value={{ state, setState }}>
            {children}
        </SessionContext.Provider>
    );
};
