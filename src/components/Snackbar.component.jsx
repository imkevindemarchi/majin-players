import React, { useContext } from "react";

// Contexts
import { SnackbarContext } from "../providers";

const Snackbar = () => {
    const { state, closeHandler } = useContext(SnackbarContext);

    return (
        <button
            onClick={(event) => {
                event.preventDefault();
                closeHandler();
            }}
            className={`fixed top-5 right-5 px-10 py-2 rounded-full flex justify-center items-center transition-all duration-200 hover:opacity-50 
                ${
                    state.isOpen
                        ? "right-5 opacity-100"
                        : "right-[-50%] opacity-0"
                } 
            ${state.type === "error" && "bg-red"} 
            ${state.type === "success" && "bg-green"} 
            ${state.type === "warning" && "bg-orange"}`}
        >
            <span className="text-white">{state.message}</span>
        </button>
    );
};

export default Snackbar;
