import React from "react";

const IconButton = ({ tabIndex, onClick, children }) => {
    return (
        <div
            tabIndex={tabIndex}
            onClick={onClick}
            className="bg-gray-200 rounded-full p-2 hover:opacity-50 transition-all duration-200 border-none cursor-pointer"
        >
            {children}
        </div>
    );
};

export default IconButton;
