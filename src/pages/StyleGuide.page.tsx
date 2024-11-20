import { ChangeEvent, FC, MouseEvent, useContext, useState } from "react";

// Assets
import { UserIcon } from "../assets/icons";

// Components
import { Backdrop, Button, Input, Loader, Snackbar } from "../components";

// Contexts
import { SnackbarContext } from "../providers";

// Types
import { SnackbarContextInterface } from "../types";

const StyleGuide: FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputWithErrorValue, setInputWithErrorValue] = useState("");
    const [inputDisabledValue, setInputDisabledValue] = useState("");
    const [inputStartIconValue, setInputStartIconValue] = useState("");
    const {
        state: snackbarState,
        activeHandler: activeSnackbar,
        closeHandler: closeSnackbar,
    } = useContext(SnackbarContext) as SnackbarContextInterface;
    const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);
    const [isLoaderOpen, setIsLoaderOpen] = useState<boolean>(false);

    const linksArray = ["input", "button", "snackbar", "backdrop", "loader"];

    function capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const links = (
        <ul className="flex flex-col gap-3 text-white text-lg">
            {linksArray.map((link) => (
                <li key={link}>
                    <a
                        href={`#${link}`}
                        className="transition-all duration-200 hover:text-primary"
                    >
                        {capitalizeFirstLetter(link)}
                    </a>
                </li>
            ))}
        </ul>
    );

    const title = (
        <span className="font-bold text-3xl text-primary">Style Guide</span>
    );

    const input = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Input</span>
            <div className="w-[30vh]">
                <Input
                    placeholder="placeholder..."
                    type="text"
                    value={inputValue}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setInputValue(event.target.value)
                    }
                />
            </div>
        </div>
    );

    const inputWithError = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Input Error</span>
            <div className="w-[30vh]">
                <Input
                    placeholder="placeholder..."
                    type="text"
                    value={inputWithErrorValue}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setInputWithErrorValue(event.target.value)
                    }
                    error={{ value: true, message: "Errore dell'input" }}
                />
            </div>
        </div>
    );

    const inputDisabled = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Input Disabled</span>
            <div className="w-[30vh]">
                <Input
                    placeholder="placeholder..."
                    type="text"
                    value={inputDisabledValue}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setInputDisabledValue(event.target.value)
                    }
                    disabled
                />
            </div>
        </div>
    );

    const inputStartIcon = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Input Start Icon</span>
            <div className="w-[30vh]">
                <Input
                    placeholder="placeholder..."
                    type="text"
                    value={inputStartIconValue}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setInputStartIconValue(event.target.value)
                    }
                    startIcon={<UserIcon />}
                />
            </div>
        </div>
    );

    const inputEndIcon = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Input End Icon</span>
            <div className="w-[30vh]">
                <Input
                    placeholder="placeholder..."
                    type="text"
                    value={inputStartIconValue}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setInputStartIconValue(event.target.value)
                    }
                    endIcon={<UserIcon />}
                />
            </div>
        </div>
    );

    const button = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Button</span>
            <div className="w-[30vh]">
                <Button
                    onClick={(event: MouseEvent<HTMLButtonElement>) =>
                        alert("Bottone premuto")
                    }
                >
                    <span className="text-white">Bottone</span>
                </Button>
            </div>
        </div>
    );

    const buttonDisabled = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Button Disabled</span>
            <div className="w-[30vh]">
                <Button
                    onClick={(event: MouseEvent<HTMLButtonElement>) =>
                        alert("Bottone premuto")
                    }
                    disabled
                >
                    <span className="text-gray-400">Bottone</span>
                </Button>
            </div>
        </div>
    );

    const snackbar = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Snackbar</span>
            <div className="w-[30vh]">
                <Button
                    onClick={(event: MouseEvent<HTMLButtonElement>) =>
                        activeSnackbar(
                            "Messaggio di prova della snackbar",
                            "success"
                        )
                    }
                >
                    <span className="text-white">Attiva Snackbar</span>
                </Button>
                <Snackbar state={snackbarState} onClose={closeSnackbar} />
            </div>
        </div>
    );

    const snackbarWarning = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Snackbar Warning</span>
            <div className="w-[30vh]">
                <Button
                    onClick={(event: MouseEvent<HTMLButtonElement>) =>
                        activeSnackbar(
                            "Messaggio di prova della snackbar",
                            "warning"
                        )
                    }
                >
                    <span className="text-white">Attiva Snackbar</span>
                </Button>
                <Snackbar state={snackbarState} onClose={closeSnackbar} />
            </div>
        </div>
    );

    const snackbarError = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Snackbar Error</span>
            <div className="w-[30vh]">
                <Button
                    onClick={(event: MouseEvent<HTMLButtonElement>) =>
                        activeSnackbar(
                            "Messaggio di prova della snackbar",
                            "error"
                        )
                    }
                >
                    <span className="text-white">Attiva Snackbar</span>
                </Button>
                <Snackbar state={snackbarState} onClose={closeSnackbar} />
            </div>
        </div>
    );

    const backdrop = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Backdrop</span>
            <div className="w-[30vh]">
                <Button
                    onClick={(event: MouseEvent<HTMLButtonElement>) =>
                        setIsBackdropOpen(true)
                    }
                >
                    <span className="text-white">Attiva Backdrop</span>
                </Button>
                <Backdrop
                    isOpen={isBackdropOpen}
                    onClose={() => setIsBackdropOpen(false)}
                >
                    <div />
                </Backdrop>
            </div>
        </div>
    );

    const loader = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Loader</span>
            <div className="w-[30vh]">
                <Button
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                        setIsLoaderOpen(true);

                        setTimeout(() => {
                            setIsLoaderOpen(false);
                        }, 3000);
                    }}
                >
                    <span className="text-white">Attiva Loader</span>
                </Button>
                <Loader isOpen={isLoaderOpen} />
            </div>
        </div>
    );

    return (
        <div className="px-40 py-20 flex flex-col gap-10 w-full h-full bg-black">
            {title}
            {links}
            <div
                id="input"
                className="flex flex-col gap-5 border-t-2 border-gray-600 py-20 border-b-2"
            >
                <span className="text-2xl text-primary font-bold">Input</span>
                <div className="flex flex-row flex-wrap gap-10">
                    {input}
                    {inputWithError}
                    {inputDisabled}
                    {inputStartIcon}
                    {inputEndIcon}
                </div>
            </div>
            <div
                id="button"
                className="flex flex-col gap-5 border-gray-600 py-20 border-b-2"
            >
                <span className="text-2xl text-primary font-bold">Button</span>
                <div className="flex flex-row flex-wrap gap-10">
                    {button}
                    {buttonDisabled}
                </div>
            </div>
            <div
                id="snackbar"
                className="flex flex-col gap-5 border-gray-600 py-20 border-b-2"
            >
                <span className="text-2xl text-primary font-bold">
                    Snackbar
                </span>
                <div className="flex flex-row flex-wrap gap-10">
                    {snackbar}
                    {snackbarWarning}
                    {snackbarError}
                </div>
            </div>
            <div
                id="backdrop"
                className="flex flex-col gap-5 border-gray-600 py-20 border-b-2"
            >
                <span className="text-2xl text-primary font-bold">
                    Backdrop
                </span>
                {backdrop}
            </div>
            <div
                id="loader"
                className="flex flex-col gap-5 border-gray-600 py-20 border-b-2"
            >
                <span className="text-2xl text-primary font-bold">Loader</span>
                {loader}
            </div>
        </div>
    );
};

export default StyleGuide;
