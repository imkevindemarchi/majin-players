import { ChangeEvent, FC, MouseEvent, useContext, useState } from "react";

// Assets
import { UserIcon } from "../assets/icons";

// Components
import {
    Backdrop,
    Button,
    Card,
    Input,
    Loader,
    Snackbar,
    Table,
} from "../components";

// Contexts
import { SnackbarContext } from "../providers";

// Types
import { PlayerT, SnackbarContextI, TableColumnT } from "../types";

// Utilities
import { setPageTitle } from "../utilities";

const StyleGuide: FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputWithErrorValue, setInputWithErrorValue] = useState("");
    const [inputDisabledValue, setInputDisabledValue] = useState("");
    const [inputStartIconValue, setInputStartIconValue] = useState("");
    const {
        state: snackbarState,
        activateHandler: activateSnackbar,
        closeHandler: closeSnackbar,
    } = useContext(SnackbarContext) as SnackbarContextI;
    const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);
    const [isLoaderOpen, setIsLoaderOpen] = useState<boolean>(false);

    setPageTitle("Style Guide");

    const linksArray = [
        "input",
        "button",
        "snackbar",
        "backdrop",
        "loader",
        "table",
        "card",
    ];
    const tableColumns: TableColumnT[] = [
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "surname",
            value: "Cognome",
        },
        {
            key: "birthYear",
            value: "Anno di nascita",
        },
        {
            key: "email",
            value: "E-mail",
        },
        {
            key: "actions",
        },
    ];
    const tableColumnsImage: TableColumnT[] = [
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "surname",
            value: "Cognome",
        },
        {
            key: "birthYear",
            value: "Anno di nascita",
        },
        {
            key: "email",
            value: "E-mail",
        },
        {
            key: "actions",
        },
        {
            key: "image",
        },
    ];
    const tableData: PlayerT[] = [
        {
            id: "6c13a4b4-b984-4a05-a09b-0f6aabc3ccaa.jpg",
            name: "Kevin",
            surname: "De Marchi",
            email: "imkevindemarchi@gmail.com",
            birthYear: 1999,
            favouriteCard: "Kashtira Arise-Heart",
            favouriteDeck: "Tearlaments",
            description: "Descrizione di prova",
            instagramLink: "https://www.instagram.com/imrayalf/",
        },
    ];

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
                        activateSnackbar(
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
                        activateSnackbar(
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
                        activateSnackbar(
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

    function tableRowHandler(rowData: any): void {
        const { id } = rowData;
        alert(`Riga cliccata: ${id}`);
    }

    const table = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Table</span>
            <Table
                columns={tableColumns}
                data={tableData}
                isDarkMode
                totalRecords={tableData.length}
                currentPage={1}
                previousPageHandler={() => alert("Pagina precedente")}
                nextPageHandler={() => alert("Pagina successiva")}
                rowHandler={tableRowHandler}
            />
        </div>
    );

    const tableImage = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Table Image</span>
            <Table
                columns={tableColumnsImage}
                data={tableData}
                isDarkMode
                totalRecords={tableData.length}
                currentPage={1}
                previousPageHandler={() => alert("Pagina precedente")}
                nextPageHandler={() => alert("Pagina successiva")}
                rowHandler={tableRowHandler}
            />
        </div>
    );

    const tableDelete = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Table Delete</span>
            <Table
                columns={tableColumns}
                data={tableData}
                isDarkMode
                totalRecords={tableData.length}
                deleteHandler={(rowData: any) => {
                    const { id } = rowData;
                    alert(`Eliminazione riga: ${id}`);
                }}
                currentPage={1}
                previousPageHandler={() => alert("Pagina precedente")}
                nextPageHandler={() => alert("Pagina successiva")}
                rowHandler={tableRowHandler}
            />
        </div>
    );

    const tableNoData = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Table No Data</span>
            <Table
                columns={tableColumns}
                data={[]}
                isDarkMode
                totalRecords={0}
                deleteHandler={(rowData: any) => {
                    const { id } = rowData;
                    alert(`Eliminazione riga: ${id}`);
                }}
                currentPage={1}
                previousPageHandler={() => alert("Pagina precedente")}
                nextPageHandler={() => alert("Pagina successiva")}
                rowHandler={tableRowHandler}
            />
        </div>
    );

    const card = (
        <div className="flex flex-col gap-3">
            <span className="text-lg text-primary">Card</span>
            <Card>
                <span className="text-white">Card Content</span>
            </Card>
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
            <div
                id="table"
                className="flex flex-col gap-5 border-gray-600 py-20 border-b-2"
            >
                <span className="text-2xl text-primary font-bold">Table</span>
                {table}
                {tableImage}
                {tableDelete}
                {tableNoData}
            </div>
            <div
                id="card"
                className="flex flex-col gap-5 border-gray-600 py-20 border-b-2"
            >
                <span className="text-2xl text-primary font-bold">Card</span>
                {card}
            </div>
        </div>
    );
};

export default StyleGuide;
