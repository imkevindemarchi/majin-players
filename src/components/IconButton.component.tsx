import { FC } from "react";

// Types
import { IconButtonInterface } from "../types";

const IconButton: FC<IconButtonInterface> = ({ children }) => {
    return (
        <button className="rounded-full p-3 hover:opacity-50 border-none bg-pink-transparent">
            {children}
        </button>
    );
};

export default IconButton;
