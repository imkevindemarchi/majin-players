import React from "react";

const Button = ({ disabled, children }) => {
    return (
        <button
            disabled={disabled}
            className={`w-full py-3 rounded-lg border-none outline-2 text-white 
                ${
                    disabled
                        ? "bg-gray-200 cursor-not-allowed outline-gray-200"
                        : "bg-primary outline-primary hover:opacity-80  transition-all duration-200"
                }`}
        >
            {children}
        </button>
    );
};

export default Button;
