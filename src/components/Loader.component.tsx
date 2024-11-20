import { FC } from "react";
import { DotLoader as Spinner } from "react-spinners";

// Components
import Backdrop from "./Backdrop.component";

// Types
import { LoaderType } from "../types";

const Loader: FC<LoaderType> = ({ isOpen }) => {
    return (
        <Backdrop isOpen={isOpen}>
            <Spinner color="white" />
        </Backdrop>
    );
};

export default Loader;
