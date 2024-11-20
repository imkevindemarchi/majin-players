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

export interface InputType {
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
export interface ButtonType {
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    children: ReactNode;
}

// Snackbar
export interface SnackbarContextType {
    state: SnackbarStateType;
    setState?: Dispatch<SetStateAction<SnackbarStateType>>;
    closeHandler: () => void;
    activeHandler: (message: string, type: SnackbarMessageType) => void;
}

export interface SnackbarProviderType {
    children: ReactNode;
}

export type SnackbarMessageType = "success" | "warning" | "error" | null;

export interface SnackbarStateType {
    message: string | null;
    isOpen: boolean;
    type: SnackbarMessageType;
}

export interface SnackbarType {
    state: SnackbarStateType;
    onClose: () => void;
}

// Backdrop
export interface BackdropType {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
}

// Loader
export interface LoaderType {
    isOpen: boolean;
}
