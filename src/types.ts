import {
    ChangeEvent,
    Dispatch,
    MouseEvent,
    ReactNode,
    SetStateAction,
} from "react";

export type PlayerT = {
    id: string;
    name: string;
    surname: string;
    email: string;
    birthYear: number;
    favouriteCard: string;
    favouriteDeck: string;
    description: string;
    instagramLink: string;
};

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
    isDarkMode?: boolean;
}

// Button
export type ButtonT = "button" | "submit" | "reset";

export interface ButtonI {
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: ButtonT;
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
    logoutHandler: () => void;
}

// IconButton
export interface IconButtonI {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    className?: string;
    type?: ButtonT;
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

// Sidebar
export interface SidebarI {
    isAdminSection: boolean;
    urlSection: string;
    routes: RouteT[];
    isDarkMode: boolean;
    themeHandler: () => void;
    logoutHandler: () => void;
    isActive: boolean;
    stateHandler: () => void;
}

// Sidebar
export interface SidebarContextI {
    state: boolean;
    stateHandler: () => void;
}

export interface SidebarProviderI {
    children: ReactNode;
}

// Hamburger
export interface HamburgerI {
    isActive: boolean;
    isDarkMode: boolean;
    onClick: () => void;
}

// Table
export type TableColumnT = {
    key: string;
    value?: string;
};

export interface TableI {
    columns: TableColumnT[];
    data: PlayerT[];
    isDarkMode: boolean;
    totalRecords: number;
    deleteHandler?: (rowData: any) => void;
    currentPage: number;
    previousPageHandler: () => void;
    nextPageHandler: () => void;
    rowHandler: (rowData: any) => void;
}

export interface TableFoooterBtnI {
    onClick: () => void;
    disabled: boolean;
    children: ReactNode;
}

// Card
export interface CardI {
    children: ReactNode;
}
