import {
    ChangeEvent,
    Dispatch,
    MouseEvent,
    ReactNode,
    SetStateAction,
} from "react";

// Input
export type InputTypeT = "text" | "number" | "password";

export type ErrorT = { value: boolean; message?: string | null };

export interface InputI {
    placeholder: string;
    type?: InputTypeT;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: ErrorT;
    disabled?: boolean;
    startIcon?: any;
    endIcon?: any;
    name?: string;
}

// Button
export interface ButtonI {
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    children: ReactNode;
}

// Snackbar
export interface SnackbarStateI {
    message: string | null;
    isOpen: boolean;
    type: SnackbarMessageT;
}

export interface SnackbarContextI {
    state: SnackbarStateI;
    setState?: Dispatch<SetStateAction<SnackbarStateI>>;
    closeHandler: () => void;
    activeHandler: (message: string, type: SnackbarMessageT) => void;
}

export interface SnackbarProviderI {
    children: ReactNode;
}

export type SnackbarMessageT = "success" | "warning" | "error" | null;

export interface SnackbarI {
    state: SnackbarStateI;
    onClose: () => void;
}

// Backdrop
export interface BackdropI {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
}

// Loader
export interface LoaderI {
    isOpen: boolean;
}

// Auth
export interface AuthContextI {
    session: any;
    setSession: Dispatch<SetStateAction<any>>;
    isUserAuthenticated: boolean;
}

export interface AuthProviderI {
    children: ReactNode;
}

// Loader
export interface LoaderContextI {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
}

export interface LoaderProviderI {
    children: ReactNode;
}

// Layout
export interface LayoutI {
    children: ReactNode;
    isAdminSection: boolean;
    pathname: string;
}

// Routes
export type RouteT = {
    path: string;
    name: string;
    isHidden?: boolean;
    element: any;
};

// Navbar
export interface NavbarI {
    isAdminSection: boolean;
    urlSection: string;
    routes: RouteT[];
    isDarkMode: boolean;
    themeHandler: () => void;
}

// IconButton
export interface IconButtonI {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

// Theme
export interface ThemeContextI {
    state: string;
    stateHandler: () => void;
}

export interface ThemeProviderI {
    children: ReactNode;
}

export type ThemeT = "light" | "dark";
