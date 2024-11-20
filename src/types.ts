import {
    ChangeEvent,
    Dispatch,
    MouseEvent,
    ReactNode,
    SetStateAction,
} from "react";

// Input
export type InputTypeType = "text" | "number" | "password";

export type ErrorType = { value: boolean; message?: string | null };

export interface InputInterface {
    placeholder: string;
    type?: InputTypeType;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: ErrorType;
    disabled?: boolean;
    startIcon?: any;
    endIcon?: any;
    name?: string;
}

// Button
export interface ButtonInterface {
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    children: ReactNode;
}

// Snackbar
export interface SnackbarContextInterface {
    state: SnackbarStateInterface;
    setState?: Dispatch<SetStateAction<SnackbarStateInterface>>;
    closeHandler: () => void;
    activeHandler: (message: string, type: SnackbarMessageType) => void;
}

export interface SnackbarProviderInterface {
    children: ReactNode;
}

export type SnackbarMessageType = "success" | "warning" | "error" | null;

export interface SnackbarStateInterface {
    message: string | null;
    isOpen: boolean;
    type: SnackbarMessageType;
}

export interface SnackbarI {
    state: SnackbarStateInterface;
    onClose: () => void;
}

// Backdrop
export interface BackdropInterface {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
}

// Loader
export interface LoaderInterface {
    isOpen: boolean;
}

// Auth
export interface AuthContextInterface {
    session: any;
    setSession: Dispatch<SetStateAction<any>>;
    isUserAuthenticated: boolean;
}

export interface AuthProviderInterface {
    children: ReactNode;
}

// Loader
export interface LoaderContextInterface {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
}

export interface LoaderProviderInterface {
    children: ReactNode;
}

// Layout
export interface LayoutInterface {
    children: ReactNode;
    isAdminSection: boolean;
    pathname: string;
}

// Routes
export type RouteType = {
    path: string;
    name: string;
    isHidden?: boolean;
    element: any;
};

// Navbar
export interface NavbarInterface {
    isAdminSection: boolean;
    urlSection: string;
    routes: RouteType[];
}

// IconButton
export interface IconButtonInterface {
    children: ReactNode;
}
