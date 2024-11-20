import { FC } from "react";

// Types
import { IconButtonI } from "../types";

const IconButton: FC<IconButtonI> = ({ children }) => {
    return (
        <button className="rounded-full p-3 hover:opacity-50 border-none bg-pink-transparent">
            {children}
        </button>
    );
};

export default IconButton;
