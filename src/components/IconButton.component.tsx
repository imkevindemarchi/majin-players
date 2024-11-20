import { FC } from "react";

// Types
import { IconButtonI } from "../types";

const IconButton: FC<IconButtonI> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="rounded-full p-3 hover:opacity-50 border-none bg-pink-transparent"
        >
            {children}
        </button>
    );
};

export default IconButton;
