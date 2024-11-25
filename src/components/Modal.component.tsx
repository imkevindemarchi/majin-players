import { FC, MouseEvent } from "react";

// Assets
import { CancelIcon } from "../assets/icons";

// Components
import Backdrop from "./Backdrop.component";
import IconButton from "./IconButton.component";

// Types
import { ModalI } from "../types";

const Modal: FC<ModalI> = ({
    title,
    isOpen,
    onClose,
    isDarkMode,
    submitBtnText,
    cancelBtnText,
    submitHandler,
    cancelHandler,
    children,
}) => {
    const modal = (
        <div
            className={`transition-all duration-200 p-10 rounded-3xl flex flex-col gap-10
                ${isDarkMode ? "bg-black" : "bg-white"}
            `}
        >
            <div className="flex justify-between gap-40">
                <span
                    className={`transition-all duration-200 text-3xl font-bold
                        ${isDarkMode ? "text-white" : "text-black"}
                    `}
                >
                    {title}
                </span>
                <IconButton onClick={onClose}>
                    <CancelIcon
                        className={`text-xl transition-all duration-200
                            ${isDarkMode ? "text-white" : "text-black"}
                        `}
                    />
                </IconButton>
            </div>
            {children}
            <div className="flex justify-end">
                <div className="w-[40%] flex flex-row justify-between">
                    <button
                        onClick={(event: MouseEvent<HTMLButtonElement>) =>
                            cancelHandler(event)
                        }
                        className={`px-5 py-3 rounded-xl transition-all duration-200 hover:opacity-50
                            ${isDarkMode ? "bg-darkgray" : "bg-gray-200"}
                        `}
                    >
                        <span
                            className={`transition-all duration-200
                                ${isDarkMode ? "text-white" : "text-black"}
                            `}
                        >
                            {cancelBtnText}
                        </span>
                    </button>
                    <button
                        onClick={(event: MouseEvent<HTMLButtonElement>) =>
                            submitHandler(event)
                        }
                        className="bg-primary px-5 py-3 rounded-xl transition-all duration-200 hover:opacity-50"
                    >
                        <span className="text-white">{submitBtnText}</span>
                    </button>
                </div>
            </div>
        </div>
    );

    return isOpen ? (
        <Backdrop isOpen={isOpen} isDarkMode={isDarkMode}>
            {modal}
        </Backdrop>
    ) : null;
};

export default Modal;
