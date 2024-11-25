import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// Api
import { PLAYERS_API } from "../../api";

// Assets
import { AddIcon, SearchIcon } from "../../assets/icons";

// Components
import { Card, IconButton, Input, Table } from "../../components";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../../providers";

// Types
import {
    LoaderContextI,
    PlayerT,
    SnackbarContextI,
    TableColumnT,
    ThemeContextI,
} from "../../types";

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
    const { setState: setIsLoading } = useContext(
        LoaderContext
    ) as LoaderContextI;
    const [from, setFrom] = useState<number>(
        parseInt(searchParams.get("from") as string) || 0
    );
    const [to, setTo] = useState<number>(
        parseInt(searchParams.get("to") as string) || 4
    );
    const [tableCurrentPage, setTableCurrentPage] = useState<number>(
        parseInt(searchParams.get("page") as string) || 1
    );
    const [tableData, setTableData] = useState<PlayerT[]>([]);
    const { activateHandler: activateSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;
    const [totalPlayers, setTotalPlayers] = useState<number>(0);

    const pageTitle: string = "Giocatori";
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

    setPageTitle(pageTitle);

    async function getDataHandler() {
        setIsLoading(true);

        const playersRes = await PLAYERS_API.getAll(
            from,
            to,
            formData.name,
            formData.surname
        );

        if (playersRes.value && playersRes.data && playersRes.totalRecords) {
            setTableData(playersRes.data);
            setTotalPlayers(playersRes.totalRecords);
        } else activateSnackbar("Impossibile recuperare i giocatori", "error");

        setIsLoading(false);
    }

    useEffect(() => {
        getDataHandler();

        // eslint-disable-next-line
    }, [from, to]);

    const title = <span className="text-3xl text-primary">{pageTitle}</span>;

    function inputHandler(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    async function submitHandler(event: any) {
        event.preventDefault();

        setSearchParams({
            name: formData.name,
            surname: formData.surname,
            from: from.toString(),
            to: to.toString(),
            page: tableCurrentPage.toString(),
        });
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

    function tablePreviousPageHandler(): void {
        setFrom(from - 5);
        setTo(to - 5);
        setTableCurrentPage(tableCurrentPage - 1);
        setSearchParams({
            name: formData.name,
            surname: formData.surname,
            from: (from - 5).toString(),
            to: (to - 5).toString(),
            page: (tableCurrentPage - 1).toString(),
        });
    }

    function tableNextPageHandler(): void {
        setFrom(from + 5);
        setTo(to + 5);
        setTableCurrentPage(tableCurrentPage + 1);
        setSearchParams({
            name: formData.name,
            surname: formData.surname,
            from: (from + 5).toString(),
            to: (to + 5).toString(),
            page: (tableCurrentPage + 1).toString(),
        });
    }

    function pageHandler(url: string): void {
        navigate(url);
    }

    function tableRowHandler(rowData: any) {
        pageHandler(`${pathname}/${rowData.id}`);
    }

    const table = (
        <Card>
            <Table
                columns={tableColumns}
                data={tableData}
                currentPage={tableCurrentPage}
                isDarkMode={isDarkMode}
                nextPageHandler={tableNextPageHandler}
                previousPageHandler={tablePreviousPageHandler}
                rowHandler={tableRowHandler}
                totalRecords={totalPlayers}
                deleteHandler={() => {}}
            />
        </Card>
    );

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
