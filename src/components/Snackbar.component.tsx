import { FC, MouseEvent } from "react";

// Assets
import { ErrorIcon, Verifiedicon, WarningIcon } from "../assets/icons";

// Types
import { SnackbarType } from "../types";

const Snackbar: FC<SnackbarType> = ({ state, onClose }) => {
    const { type, isOpen, message } = state;

    const isErrorType = type === "error";
    const isSuccessType = type === "success";
    const isWarningType = type === "warning";

    function closeHandler(event: MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        onClose();
    }

    return (
        <div className="w-full z-[50] fixed left-0 flex justify-center items-center">
            <button
                onClick={closeHandler}
                className={`max-w-[30%] fixed z-[50] px-10 py-2 rounded-full flex flex-row gap-2 justify-center items-center transition-all top-5 text-white
                    ${
                        isOpen
                            ? "right-5 opacity-100"
                            : "right-[-50%] opacity-0"
                    } 
                    ${isErrorType && "bg-red"} 
                    ${isSuccessType && "bg-green"} 
                    ${isWarningType && "bg-orange"}
                `}
            >
                {isErrorType && <ErrorIcon className="text-xl" />}
                {isSuccessType && <Verifiedicon className="text-xl" />}
                {isWarningType && <WarningIcon className="text-xl" />}
                <span>{message}</span>
            </button>
        </div>
    );
};

export default Snackbar;
