import { ChangeEvent, MouseEvent, ReactNode } from "react";

export interface InputType {
    placeholder: string;
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: { value: boolean; message: string };
    disabled?: boolean;
    startIcon?: any;
    endIcon?: any;
}

export interface ButtonType {
    disabled?: boolean;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}
