import { FC } from "react";
import { DotLoader as Spinner } from "react-spinners";

// Components
import Backdrop from "./Backdrop.component";

// Types
import { LoaderInterface } from "../types";

const Loader: FC<LoaderInterface> = ({ isOpen }) => {
    return (
        <Backdrop isOpen={isOpen}>
            <Spinner color="white" />
        </Backdrop>
    );
};

export default Loader;
