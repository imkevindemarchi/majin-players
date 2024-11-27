import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Api
import { PLAYERS_API } from "../api";

// Components
import { Card, Tops } from "../components";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../providers";

// Types
import {
    LoaderContextI,
    PlayerT,
    SnackbarContextI,
    ThemeContextI,
} from "../types";

// Utilities
import { setPageTitle } from "../utilities";
import { InstagramIcon } from "../assets/icons";

interface RowI {
    label?: string;
    value?: string;
}

const Player: FC = () => {
    const { setState: setIsLoading } = useContext(
        LoaderContext
    ) as LoaderContextI;
    const { activateHandler: activateSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;
    const [data, setData] = useState<PlayerT | null>(null);
    const { state: theme } = useContext(ThemeContext) as ThemeContextI;
    const { id } = useParams();

    const isDarkMode: boolean = theme === "dark";
    const fullNameText: string = `${data?.name} ${data?.surname}`;

    setPageTitle("Giocatore");

    async function getDataHandler() {
        if (id) {
            setIsLoading(true);

            const res = await PLAYERS_API.get(id);

            if (res) {
                setData(res);
            } else
                activateSnackbar(
                    "Impossibile recuperare il giocatore",
                    "error"
                );

            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDataHandler();

        // eslint-disable-next-line
    }, []);

    const Row = ({ label, value }: RowI) => (
        <div className="flex flex-row gap-1 mobile:flex-wrap">
            <span
                className={`transition-all duration-200 text-lg
                    ${isDarkMode ? "text-white" : "text-black"}
                `}
            >
                {label}
            </span>
            <span className="text-primary text-lg font-bold">{value}</span>
        </div>
    );

    const info = (
        <div className="flex flex-col gap-10 mobile:justify-center mobile:items-center">
            <span
                className={`transition-all duration-200 text-2xl font-bold
                    ${isDarkMode ? "text-white" : "text-black"}
                `}
            >
                {fullNameText}
            </span>
            <div
                className={`transition-all duration-200 overflow-hidden rounded-xl flex flex-row relative mobile:flex-col mobile:pb-20
                    ${isDarkMode ? "bg-black" : "bg-white"}
                `}
            >
                <img
                    src={`https://koghcmfdnzuxvzfmbzop.supabase.co/storage/v1/object/public/images/${data?.id}`}
                    alt="Impossibile visualizzare l'immagine."
                    className="w-[30vh] object-contain mobile:w-full"
                />
                <div className="py-10 flex flex-col gap-5 px-10 mobile:px-5">
                    <Row
                        label="Anno di nascita:"
                        value={data?.birthYear?.toString()}
                    />
                    <Row label="Carta preferita:" value={data?.favouriteCard} />
                    <Row label="Mazzo preferito:" value={data?.favouriteDeck} />
                    <span
                        className={`transition-all duration-200 text-lg overflow-y-scroll max-h-[20vh]
                            ${isDarkMode ? "text-white" : "text-black"}
                        `}
                    >
                        {data?.description}
                    </span>
                </div>
                {data?.instagramLink && (
                    <a
                        href={data?.instagramLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <InstagramIcon className="transition-all duration-200 text-primary absolute text-[4em] bottom-10 right-10 cursor-pointer hover:opacity-50" />
                    </a>
                )}
            </div>
        </div>
    );

    const tops = <Tops isDarkMode={isDarkMode} playerId={id} />;

    return (
        <div className="flex flex-row flex-wrap pb-[30vh] mobile:pb-[100vh] gap-10 mobile:gap-5">
            <Card hiddenOnMobile>
                <div className="flex flex-col gap-10">
                    {info}
                    {tops}
                </div>
            </Card>
        </div>
    );
};

export default Player;
