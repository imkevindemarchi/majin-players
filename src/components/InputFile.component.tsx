import { ChangeEvent, FC, MouseEvent, useRef } from "react";

// Components
import IconButton from "./IconButton.component";

// Types
import { InputFileI } from "../types";

const InputFile: FC<InputFileI> = ({ value, onChange, error, icon }) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const errorComponent = error?.value && (
        <span className="text-red">{error?.message}</span>
    );

    const iconButton = (
        <IconButton
            className="p-5"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                if (hiddenFileInput.current) {
                    hiddenFileInput.current.click();
                }
            }}
        >
            {icon}
        </IconButton>
    );

    const fileName = (
        <span className="text-primary mobile:hidden">{value?.name}</span>
    );

    const input = (
        <input
            ref={hiddenFileInput}
            id="file-upload"
            type="file"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const files = event.target.files;
                console.log("🚀 ~ files:", files);
                if (files && files.length > 0) onChange(files[0]);
            }}
        />
    );

    return (
        <div className="flex flex-row gap-5 items-center">
            {iconButton}
            {fileName}
            {input}
            {errorComponent}
        </div>
    );
};

export default InputFile;
