import { createContext, useState } from "react";

// Types
import { LoaderContextInterface, LoaderProviderInterface } from "../types";

export const LoaderContext = createContext<LoaderContextInterface | null>(null);

export const LoaderProvider = ({ children }: LoaderProviderInterface) => {
    const [state, setState] = useState(false);

    return (
        <LoaderContext.Provider value={{ state, setState }}>
            {children}
        </LoaderContext.Provider>
    );
};
