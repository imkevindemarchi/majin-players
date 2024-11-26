import { FC, useContext, useEffect, useState } from "react";

// Api
import { EQUIPMENTS_API, SPONSORSHIPS_API } from "../api";

// Contexts
import { LoaderContext, SnackbarContext } from "../providers";

// Types
import { LoaderContextI, SnackbarContextI } from "../types";

const Home: FC = () => {
    const { setState: setIsLoading } = useContext(
        LoaderContext
    ) as LoaderContextI;
    const { activateHandler: activateSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;
    const [img, setImg] = useState<any>(null);
    const [sponsorships, setSponsorships] = useState<any[]>([]);

    async function getEquipmentHandler() {
        const res = await EQUIPMENTS_API.getByName("Maglietta");

        if (res && res.id) setImg(res.id);
        else
            activateSnackbar(
                "Impossibile recuperare l'equipaggiamento",
                "error"
            );
    }

    async function getSponsorshipsHandler() {
        const res = await SPONSORSHIPS_API.getAllWithoutFilters();

        if (res && res.data) setSponsorships(res.data);
        else activateSnackbar("Impossibile recuperare gli sponsor", "error");
    }

    useEffect(() => {
        setIsLoading(true);

        getEquipmentHandler();
        getSponsorshipsHandler();

        setIsLoading(false);
        // eslint-disable-next-line
    }, []);

    const image = (
        <img
            src={`https://koghcmfdnzuxvzfmbzop.supabase.co/storage/v1/object/public/images/${img}`}
            alt="Impossibile visualizzare l'immagine."
            className="w-[30%]"
        />
    );

    const sponsorshipsComponent = (
        <div className="flex flex-row justify-around items-center w-full">
            {sponsorships.map((sponsorship) => (
                <div
                    key={sponsorship.id}
                    className="border-solid border-2 border-white rounded-full p-10 justify-center items-center"
                >
                    <img
                        src={`https://koghcmfdnzuxvzfmbzop.supabase.co/storage/v1/object/public/images/${sponsorship.id}`}
                        alt="Impossibile visualizzare l'immagine."
                        className="h-40 w-40 object-contain "
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col justify-center items-center pb-[30vh] gap-[35vh]">
            {image}
            {sponsorshipsComponent}
        </div>
    );
};

export default Home;
