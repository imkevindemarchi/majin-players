import { FC } from "react";

// Types
import { BackdropType } from "../types";

const Backdrop: FC<BackdropType> = ({ isOpen, onClose, children }) => {
    return isOpen ? (
        <div
            onClick={onClose}
            className={`fixed top-0 left-0 w-full h-[100vh] bg-backdrop z-[40] flex justify-center items-center
                ${onClose && "cursor-pointer"}
            `}
        >
            {children}
        </div>
    ) : null;
};

export default Backdrop;
