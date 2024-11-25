import { FC } from "react";

// Types
import { CardI } from "../types";

const Card: FC<CardI> = ({ children }) => {
    return (
        <div className="bg-pink-transparent-2 p-20 rounded-3xl w-full mobile:p-10">
            {children}
        </div>
    );
};

export default Card;
