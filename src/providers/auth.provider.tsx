import { createContext, useState } from "react";

// Types
import { AuthContextInterface, AuthProviderInterface } from "../types";

// Utilities
import { getFromStorage } from "../utilities";

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: AuthProviderInterface) => {
    const [session, setSession] = useState<any>(null);

    const isUserAuthenticated = getFromStorage("user") ? true : false;

    return (
        <AuthContext.Provider value={{ session, setSession, isUserAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
