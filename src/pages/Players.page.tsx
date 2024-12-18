import { FC, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Api
import { PLAYERS_API } from "../api";

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

interface PlayerI {
    data: PlayerT;
}

const Players: FC = () => {
    const { setState: setIsLoading } = useContext(
        LoaderContext
    ) as LoaderContextI;
    const { activateHandler: activateSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;
    const [players, setPlayers] = useState<PlayerT[]>([]);
    const { pathname }: { pathname: string } = useLocation();
    const { state: theme } = useContext(ThemeContext) as ThemeContextI;

    const isDarkMode: boolean = theme === "dark";

    setPageTitle("Giocatori");

    async function getDataHandler() {
        setIsLoading(true);

        const res = await PLAYERS_API.getAllWithoutFilters();

        if (res.value && res.data) {
            setPlayers(res.data);
        } else activateSnackbar("Impossibile recuperare i giocatori", "error");

        setIsLoading(false);
    }

    useEffect(() => {
        getDataHandler();

        // eslint-disable-next-line
    }, []);

    const Player = ({ data }: PlayerI) => (
        <Link
            to={`${pathname}/${data.id}`}
            className="relative transition-all duration-200 hover:opacity-50"
        >
            <img
                src={`https://koghcmfdnzuxvzfmbzop.supabase.co/storage/v1/object/public/images/${data.id}`}
                alt="Impossibile visualizzare l'immagine."
                className={`transition-all duration-200 w-[25vh] object-contain rounded-xl mobile:w-40
                    ${isDarkMode ? "border-white" : "border-black"}
                `}
            />
            <div className="absolute bottom-5 w-full flex justify-center items-center">
                <div className="w-[80%] py-2 flex justify-center items-center bg-primary rounded-xl">
                    <span className="text-white font-bold text-xl mobile:text-base">
                        {data.name}
                    </span>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="flex flex-row flex-wrap pb-[30vh] mobile:pb-[100vh] mobile:pt-20 gap-10 justify-center mobile:gap-5">
            {players.map((player: PlayerT) => (
                <Player key={player.id} data={player} />
            ))}
        </div>
    );
};

export default Players;
