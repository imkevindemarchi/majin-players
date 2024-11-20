import { ChangeEvent, FC, MouseEvent, useState } from "react";

// Assets
import logoImg from "../assets/images/logo.png";
import { ClosedEyeIcon, OpenedEyeIcon } from "../assets/icons";

// Components
import { Button, Input } from "../components";

// Types
import { ErrorType } from "../types";

// Utilities
import { checkEmail } from "../utilities";

interface FormDataType {
    email: string;
    password: string;
}

type PasswordType = "text" | "password";

interface ErrorsType {
    email: ErrorType;
    password: ErrorType;
}

const formDataInitialValues = {
    email: "",
    password: "",
};

const errorsInitialValues = {
    email: {
        value: false,
        message: null,
    },
    password: {
        value: false,
        message: null,
    },
};

const LogIn: FC = () => {
    const [formData, setFormData] = useState<FormDataType>(
        formDataInitialValues
    );
    const [passwordType, setPasswordType] = useState<PasswordType>("password");
    const [errors, setErrors] = useState<ErrorsType>(errorsInitialValues);

    function resetError(name: string): void {
        setErrors((prevState) => ({
            ...prevState,
            [name]: { value: false, message: null },
        }));
    }

    function inputHandler(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));

        resetError(name);
    }

    function passwordTypeHandler(event: MouseEvent<HTMLInputElement>): void {
        event.preventDefault();
        event.stopPropagation();
        setPasswordType(passwordType === "password" ? "text" : "password");
    }

    const passwordEndIcon = (
        <div onClick={passwordTypeHandler}>
            {passwordType === "password" ? (
                <OpenedEyeIcon className="transition-all duration-200 text-2xl cursor-pointer hover:opacity-80" />
            ) : (
                <ClosedEyeIcon className="transition-all duration-200 text-2xl cursor-pointer hover:opacity-80" />
            )}
        </div>
    );

    function submitHandler(event: any) {
        event.preventDefault();

        const isEmailValid = checkEmail(formData.email);

        if (isEmailValid.value)
            setErrors((prevState) => ({
                ...prevState,
                email: isEmailValid,
            }));
        else {
            console.log("form", formData);
        }
    }

    const form = (
        <form
            onSubmit={submitHandler}
            style={{
                background: "rgba(255, 255, 255, 0.4)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(7.5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
            className="py-20 px-40 flex flex-col gap-5 justify-center items-center"
        >
            <span className="text-white font-bold uppercase text-3xl">
                Log In
            </span>
            <Input
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={inputHandler}
                error={errors.email}
            />
            <Input
                type={passwordType}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={inputHandler}
                endIcon={passwordEndIcon}
                error={errors.password}
            />
            <Button type="submit">
                <span className="text-lg text-white">Accedi</span>
            </Button>
        </form>
    );

    return (
        <div
            style={{
                backgroundColor: "black",
                backgroundImage: `url(${logoImg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                objectFit: "contain",
                backgroundPosition: "center",
            }}
            className="flex justify-center items-center h-[100vh] w-full"
        >
            {form}
        </div>
    );
};

export default LogIn;
