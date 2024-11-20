import { createContext, useState } from "react";

// Types
import { LoaderContextType, LoaderProviderType } from "../types";

export const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderProvider = ({ children }: LoaderProviderType) => {
    const [state, setState] = useState(false);

    return (
        <LoaderContext.Provider value={{ state, setState }}>
            {children}
        </LoaderContext.Provider>
    );
};
