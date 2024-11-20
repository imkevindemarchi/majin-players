import { FC } from "react";

// Types
import { InputInterface } from "../types";

const Input: FC<InputInterface> = ({
    placeholder,
    type = "text",
    value,
    onChange,
    error,
    disabled,
    startIcon,
    endIcon,
    name,
}) => {
    const inputComponent = (
        <div
            className={`w-full px-5 py-4 rounded-lg flex flex-row gap-5 items-center
                ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"}
            `}
        >
            {startIcon && <div className="text-gray-400">{startIcon}</div>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                name={name}
                className={`w-full border-none outline-none bg-transparent
                    ${disabled && "cursor-not-allowed"}
                `}
            />
            {endIcon && <div className="text-gray-400">{endIcon}</div>}
        </div>
    );

    const errorComponent = <span className="text-red">{error?.message}</span>;

    return (
        <div className="w-full flex flex-col gap-2">
            {inputComponent}
            {error?.value && errorComponent}
        </div>
    );
};

export default Input;
