import { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

// Assets
import { BackIcon } from "../assets/icons";

// Types
import { GoBackBtnI } from "../types";

const GoBackBtn: FC<GoBackBtnI> = ({ isDarkMode }) => {
    const navigate = useNavigate();

    function goBackHandler(event: MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        navigate(-1);
    }

    return (
        <button
            onClick={goBackHandler}
            className="bg-pink-transparent px-5 py-3 rounded-full flex flex-row items-center gap-3 transition-all duration-200 max-w-[20%] justify-center hover:opacity-50"
        >
            <BackIcon className="text-2xl text-primary" />
            <span
                className={`transition-all duration-200
                    ${isDarkMode ? "text-white" : "text-black"}
                `}
            >
                Torna indietro
            </span>
        </button>
    );
};

export default GoBackBtn;
