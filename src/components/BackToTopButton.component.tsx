import { FC, useState } from "react";

// Assets
import { ArrowUpIcon } from "../assets/icons";

// Types
import { BackToTopButtonI } from "../types";

const BackToTopButton: FC<BackToTopButtonI> = ({ isDarkMode }) => {
    const [state, setState] = useState(false);

    function checkScroll() {
        if (!state && window.pageYOffset > 20) setState(true);
        else if (state && window.pageYOffset <= 20) setState(false);
    }

    window.addEventListener("scroll", checkScroll);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
                opacity: state ? ".8" : "0",
                zIndex: state ? "900" : "-900",
            }}
            className={`border-none outline-none p-3 rounded-lg fixed bottom-7 right-7 bg-primary
            `}
        >
            <ArrowUpIcon
                className={`transition-all duration-200 text-[2em] ${
                    isDarkMode ? "text-black" : "text-white"
                }`}
            />
        </button>
    );
};

export default BackToTopButton;
