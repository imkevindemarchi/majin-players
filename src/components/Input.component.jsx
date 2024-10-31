import React from "react";

const Input = ({
    autofocus,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    endIcon,
    error,
    onFocus,
}) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <div
                className={`bg-white px-5 w-full h-14 rounded-lg flex flex-row gap-5 items-center ${
                    error && error.value && "border-red border-2"
                }`}
            >
                <input
                    autoFocus={autofocus}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    className="border-none outline-none bg-transparent w-full"
                />
                {endIcon && endIcon}
            </div>
            {error && error.value && (
                <span className="text-red">{error.message}</span>
            )}
        </div>
    );
};

export default Input;
