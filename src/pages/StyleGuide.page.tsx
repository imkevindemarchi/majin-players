import { ChangeEvent, FC, MouseEvent, useState } from "react";

// Assets
import { UserIcon } from "../assets/icons";

// Components
import { Button, Input } from "../components";

const StyleGuide: FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputWithErrorValue, setInputWithErrorValue] = useState("");
    const [inputDisabledValue, setInputDisabledValue] = useState("");
    const [inputStartIconValue, setInputStartIconValue] = useState("");

    const links = (
        <ul className="flex flex-col gap-3 text-white text-lg">
            <li>
                <a
                    href="#input"
                    className="transition-all duration-200 hover:text-primary"
                >
                    Input
                </a>
            </li>
            <li>
                <a
                    href="#button"
                    className="transition-all duration-200 hover:text-primary"
                >
                    Button
                </a>
            </li>
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

    return (
        <div className="px-40 py-20 flex flex-col gap-10 w-full h-full bg-black">
            {title}
            {links}
            <div
                id="input"
                className="flex flex-col gap-5 border-t-2 border-gray-600 py-20 border-b-2"
            >
                <span className="text-2xl text-primary font-bold">Input</span>
                {input}
                {inputWithError}
                {inputDisabled}
                {inputStartIcon}
                {inputEndIcon}
            </div>
            <div
                id="button"
                className="flex flex-col gap-5 border-gray-600 py-20 border-b-2"
            >
                <span className="text-2xl text-primary font-bold">Button</span>
                {button}
                {buttonDisabled}
            </div>
        </div>
    );
};

export default StyleGuide;
