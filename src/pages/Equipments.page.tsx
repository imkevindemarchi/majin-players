import { FC, useContext, useEffect, useState } from "react";

// Api
import { EQUIPMENTS_API } from "../api";

// Contexts
import { LoaderContext, SnackbarContext } from "../providers";

// Types
import { EquipmentT, LoaderContextI, SnackbarContextI } from "../types";

// Utilities
import { setPageTitle } from "../utilities";

const Equipments: FC = () => {
    const [tShirt, setTShirt] = useState<EquipmentT | null>(null);
    const [armWarmer, setArmWarmer] = useState<EquipmentT | null>(null);
    const [spellground, setSpellground] = useState<EquipmentT | null>(null);
    const [playmat, setPlaymat] = useState<EquipmentT | null>(null);
    const [fieldCenter, setFieldCenter] = useState<EquipmentT | null>(null);

    const { setState: setIsLoading } = useContext(
        LoaderContext
    ) as LoaderContextI;
    const { activateHandler: activateSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;

    setPageTitle("Equipaggiamenti");

    async function getDataHandler() {
        setIsLoading(true);

        const tshirtRes = await EQUIPMENTS_API.getByName("Maglietta");
        if (tshirtRes) setTShirt(tshirtRes);
        else activateSnackbar("Impossibile recuperare la maglietta", "error");

        const armWarmerRes = await EQUIPMENTS_API.getByName("Scaldamuscolo");
        if (armWarmerRes) setArmWarmer(armWarmerRes);
        else
            activateSnackbar(
                "Impossibile recuperare lo scaldamuscolo",
                "error"
            );

        const spellgroundRes = await EQUIPMENTS_API.getByName("Spellground");
        if (spellgroundRes) setSpellground(spellgroundRes);
        else activateSnackbar("Impossibile recuperare lo spellground", "error");

        const playmatRes = await EQUIPMENTS_API.getByName("Playmat");
        if (playmatRes) setPlaymat(playmatRes);
        else activateSnackbar("Impossibile recuperare il playmat", "error");

        const fieldCenterRes = await EQUIPMENTS_API.getByName("Field Center");
        if (fieldCenterRes) setFieldCenter(fieldCenterRes);
        else
            activateSnackbar("Impossibile recuperare il field center", "error");

        setIsLoading(false);
    }

    useEffect(() => {
        getDataHandler();

        // eslint-disable-next-line
    }, []);

    const tshirtImage = (
        <img
            src={`${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/images/${tShirt?.id}`}
            alt="Impossibile visualizzare l'immagine."
            className="w-[40vh] object-contain mobile:w-60"
        />
    );

    const armWarmerImage = (
        <img
            src={`${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/images/${armWarmer?.id}`}
            alt="Impossibile visualizzare l'immagine."
            className="w-[25vh] mobile:w-32 object-contain"
        />
    );

    const spellgroundImage = (
        <img
            src={`${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/images/${spellground?.id}`}
            alt="Impossibile visualizzare l'immagine."
            className="w-[60vh] mobile:w-[40vh] object-contain"
        />
    );

    const playmatImage = (
        <img
            src={`${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/images/${playmat?.id}`}
            alt="Impossibile visualizzare l'immagine."
            className="w-[60vh] mobile:w-[40vh] object-contain"
        />
    );

    const fieldCenterImage = (
        <img
            src={`${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/images/${fieldCenter?.id}`}
            alt="Impossibile visualizzare l'immagine."
            className="w-60 mobile:w-32 object-contain"
        />
    );

    return (
        <div className="flex flex-col justify-center items-center pb-[30vh] gap-20 mobile:pb-[100vh] mobile:pt-20">
            <div className="w-full justify-center flex flex-row gap-10 mobile:gap-0">
                {tshirtImage}
                {armWarmerImage}
            </div>
            <div className="flex flex-row gap-10 justify-center mobile:flex-col mobile:items-center">
                {spellgroundImage}
                {playmatImage}
                {fieldCenterImage}
            </div>
        </div>
    );
};

export default Equipments;
