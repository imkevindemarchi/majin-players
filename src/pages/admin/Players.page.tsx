import { ChangeEvent, FC, useContext, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// Assets
import { AddIcon, SearchIcon } from "../../assets/icons";

// Components
import { Card, IconButton, Input, Table } from "../../components";

// Contexts
import { ThemeContext } from "../../providers";

// Types
import { PlayerT, TableColumnT, ThemeContextI } from "../../types";

// Utilities
import { setPageTitle } from "../../utilities";

interface FormDataI {
    name: string;
    surname: string;
}

const Players: FC = () => {
    const { state: theme } = useContext(ThemeContext) as ThemeContextI;
    const [searchParams, setSearchParams] = useSearchParams({});
    const [formData, setFormData] = useState<FormDataI>({
        name: searchParams.get("name") || "",
        surname: searchParams.get("surname") || "",
    });
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const pageTitle: string = "Giocatori";

    setPageTitle(pageTitle);

    const isDarkMode = theme === "dark";
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
    const tableData: PlayerT[] = [];

    const title = <span className="text-3xl text-primary">{pageTitle}</span>;

    function inputHandler(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    function submitHandler(event: any) {
        event.preventDefault();

        setSearchParams({ name: formData.name, surname: formData.surname });
    }

    const form = (
        <Card>
            <form onSubmit={submitHandler} className="flex flex-row gap-5">
                <div className="w-[30vh]">
                    <Input
                        name="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={inputHandler}
                        isDarkMode={isDarkMode}
                    />
                </div>
                <div className="w-[30vh]">
                    <Input
                        name="surname"
                        placeholder="Cognome"
                        value={formData.surname}
                        onChange={inputHandler}
                        isDarkMode={isDarkMode}
                    />
                </div>
                <IconButton
                    type="submit"
                    className="w-14 h-1w-14 flex justify-center items-center bg-primary"
                >
                    <SearchIcon className="text-white" />
                </IconButton>
            </form>
        </Card>
    );

    const table = (
        <Card>
            <Table
                columns={tableColumns}
                data={tableData}
                currentPage={1}
                isDarkMode={isDarkMode}
                nextPageHandler={() => {}}
                previousPageHandler={() => {}}
                rowHandler={() => {}}
                totalRecords={0}
                deleteHandler={() => {}}
            />
        </Card>
    );

    function pageHandler(url: string): void {
        navigate(url);
    }

    const btn = (
        <div className="fixed bottom-10 right-10">
            <IconButton
                onClick={() => pageHandler(`${pathname}/new`)}
                className="px-4 py-4"
            >
                <AddIcon className="text-primary text-3xl" />
            </IconButton>
        </div>
    );

    return (
        <div className="flex flex-col gap-10">
            {title}
            {form}
            {table}
            {btn}
        </div>
    );
};

export default Players;
