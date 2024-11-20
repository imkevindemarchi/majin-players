import { createContext, useState } from "react";

// Types
import { AuthContextI, AuthProviderI } from "../types";

// Utilities
import { getFromStorage } from "../utilities";

export const AuthContext = createContext<AuthContextI | null>(null);

export const AuthProvider = ({ children }: AuthProviderI) => {
    const [session, setSession] = useState<any>(null);

    const isUserAuthenticated = getFromStorage("user") ? true : false;

    return (
        <AuthContext.Provider value={{ session, setSession, isUserAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
