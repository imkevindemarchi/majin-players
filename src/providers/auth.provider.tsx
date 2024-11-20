import { createContext, useState } from "react";

// Types
import { AuthContextType, AuthProviderType } from "../types";

// Utilities
import { getFromStorage } from "../utilities";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderType) => {
    const [session, setSession] = useState<any>(null);

    const isUserAuthenticated = getFromStorage("user") ? true : false;

    return (
        <AuthContext.Provider value={{ session, setSession, isUserAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
