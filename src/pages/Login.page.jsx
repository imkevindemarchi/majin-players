import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Api
import { AUTH_API } from "../api";

// Assets
import logoImg from "../assets/images/logo.png";
import { OpenedEyeIcon, ClosedEyeIcon } from "../assets/icons";

// Components
import { Input, Button, IconButton } from "../components";

// Contexts
import { SnackbarContext } from "../providers";

// Utils
import { checkEmail, setPageTitle } from "../utils";

const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const [formDataValues, setFormDataValues] = useState(initialState);
    const [passwordType, setPasswordType] = useState("password");
    const [errors, setErrors] = useState({
        email: {
            value: false,
            message: "",
        },
        password: {
            value: false,
            message: "",
        },
    });
    const isBtnDisabled = !formDataValues.email || !formDataValues.password;
    const { activeHandler: activeSnackbar } = useContext(SnackbarContext);
    const navigate = useNavigate();

    setPageTitle("Log-in");

    async function submitHandler(event) {
        event.preventDefault();

        const isEmailValid = checkEmail(formDataValues.email);

        if (!isEmailValid)
            setErrors((prevState) => ({
                ...prevState,
                email: { value: true, message: "E-mail errata" },
            }));
        else {
            const res = await AUTH_API.login(
                formDataValues.email,
                formDataValues.password
            );
            if (!res)
                activeSnackbar("Impossibile effettuare il log-in", "error");
            else navigate("/admin");
        }
    }

    function resetError(event) {
        setErrors((prevState) => ({
            ...prevState,
            [event.target.name]: { value: false, message: "" },
        }));
    }

    function inputHandler(event) {
        setFormDataValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));

        resetError(event);
    }

    const passwordEndIcon =
        passwordType === "password" ? <OpenedEyeIcon /> : <ClosedEyeIcon />;

    function passwordTypeHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setPasswordType(passwordType === "password" ? "text" : "password");
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
            className="px-40 py-20 flex flex-col gap-5 justify-center items-center"
        >
            <span className="text-white font-bold uppercase text-3xl">
                Log In
            </span>
            <Input
                autofocus
                name="email"
                value={formDataValues?.email}
                onChange={inputHandler}
                placeholder="E-mail"
                error={errors.email}
            />
            <Input
                type={passwordType}
                name="password"
                value={formDataValues?.password}
                onChange={inputHandler}
                placeholder="Password"
                endIcon={
                    <IconButton tabIndex="-1" onClick={passwordTypeHandler}>
                        {passwordEndIcon}
                    </IconButton>
                }
                error={errors.password}
            />
            <Button disabled={isBtnDisabled}>
                <span className="font-bold text-lg">Accedi</span>
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

export default Login;
