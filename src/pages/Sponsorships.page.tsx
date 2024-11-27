import { FC, useContext, useEffect, useState } from "react";

// Api
import { SPONSORSHIPS_API } from "../api";

// Contexts
import { LoaderContext, SnackbarContext } from "../providers";

// Types
import { LoaderContextI, SnackbarContextI, SponsorshipT } from "../types";

// Utilities
import { setPageTitle } from "../utilities";

const Sponsorships: FC = () => {
    const [sponsorships, setSponsorships] = useState<SponsorshipT[]>([]);

    const { setState: setIsLoading } = useContext(
        LoaderContext
    ) as LoaderContextI;
    const { activateHandler: activateSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;

    setPageTitle("Sponsor");

    async function getDataHandler() {
        setIsLoading(true);

        const res = await SPONSORSHIPS_API.getAllWithoutFilters();

        if (res && res.data) setSponsorships(res.data);
        else activateSnackbar("Impossibile recuperare gli sponsor", "error");

        setIsLoading(false);
    }

    useEffect(() => {
        getDataHandler();

        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex flex-col justify-center items-center pb-[30vh] gap-20 mobile:pb-[100vh] mobile:pt-20">
            <div className="flex flex-row justify-around items-center w-full mobile:flex-col mobile:gap-20">
                {sponsorships.map((sponsorship) => (
                    <div
                        key={sponsorship.id}
                        className="border-solid border-2 border-white rounded-full p-10 justify-center items-center bg-pink-transparent"
                    >
                        <img
                            src={`https://koghcmfdnzuxvzfmbzop.supabase.co/storage/v1/object/public/images/${sponsorship.id}`}
                            alt="Impossibile visualizzare l'immagine."
                            className="h-40 w-40 mobile:h-20 mobile:w-20 object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sponsorships;
