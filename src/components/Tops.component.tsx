import {
    ChangeEvent,
    FC,
    MouseEvent,
    useContext,
    useEffect,
    useState,
} from "react";

// Api
import { TOPS_API } from "../api";

// Assets
import { AddIcon, DeleteIcon } from "../assets/icons";

// Components
import Input from "./Input.component";
import Card from "./Card.component";
import Modal from "./Modal.component";
import IconButton from "./IconButton.component";

// Contexts
import { LoaderContext, SnackbarContext } from "../providers";

// Types
import {
    ErrorT,
    LoaderContextI,
    SnackbarContextI,
    TopsI,
    TopT,
} from "../types";

// Utilities
import { checkFormField, checkFormFieldYear } from "../utilities";

interface FormDataI {
    year: string;
    position: string;
    deck: string;
    tournament: string;
    place: string;
}

const formDataInitialState: FormDataI = {
    year: "",
    position: "",
    deck: "",
    tournament: "",
    place: "",
};

interface ErrorsI {
    year: ErrorT;
    position: ErrorT;
    deck: ErrorT;
    tournament: ErrorT;
    place: ErrorT;
}

const errorsInitialValues: ErrorsI = {
    year: {
        value: false,
        message: null,
    },
    position: {
        value: false,
        message: null,
    },
    deck: {
        value: false,
        message: null,
    },
    tournament: {
        value: false,
        message: null,
    },
    place: {
        value: false,
        message: null,
    },
};

const Tops: FC<TopsI> = ({ isDarkMode, isAdminSection, playerId }) => {
    const [formData, setFormData] = useState<FormDataI>(formDataInitialState);
    const [errors, setErrors] = useState<ErrorsI>(errorsInitialValues);
    const { setState: setIsLoading } = useContext(
        LoaderContext
    ) as LoaderContextI;
    const [tops, setTops] = useState<TopT[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [selectedTop, setSelectedTop] = useState<TopT | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const { activateHandler: activateSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;

    function getDistinctYears(array: TopT[]): number[] {
        return Array.from(new Set(array.map((obj) => obj.year)));
    }

    async function getDataHandler() {
        if (playerId) {
            setIsLoading(true);

            const res = await TOPS_API.getAll(playerId);

            if (res) {
                const years: number[] = getDistinctYears(res);
                const orderedYears: number[] = years.sort((a, b) => b - a);
                setYears(orderedYears);
                setTops(res);
            }

            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDataHandler();

        // eslint-disable-next-line
    }, []);

    const title = tops.length > 0 && years.length > 0 && (
        <span
            className={`transition-all duration-200 text-3xl
                ${isAdminSection && "text-primary"}
                ${
                    !isAdminSection &&
                    (isDarkMode ? "text-white" : "text-black")
                } 
            `}
        >
            Top
        </span>
    );

    function inputHandler(
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ): void {
        const { name, value }: { name: string; value: string } = event.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    function validateForm(): boolean {
        const currentYear: number = new Date().getFullYear();
        const allowedMaxYear: number = currentYear;

        const hasYearError: ErrorT = checkFormFieldYear(
            formData.year,
            allowedMaxYear
        );
        const hasPositionError: ErrorT = checkFormField(formData.position);
        const hasDeckError: ErrorT = checkFormField(formData.deck);
        const hasTournamentError: ErrorT = checkFormField(formData.tournament);
        const hasPlaceError: ErrorT = checkFormField(formData.place);

        setErrors((prevState) => ({
            ...prevState,
            year: {
                value: hasYearError.value,
                message: hasYearError.message,
            },
            position: {
                value: hasPositionError.value,
                message: hasPositionError.message,
            },
            deck: {
                value: hasDeckError.value,
                message: hasDeckError.message,
            },
            tournament: {
                value: hasTournamentError.value,
                message: hasTournamentError.message,
            },
            place: {
                value: hasPlaceError.value,
                message: hasPlaceError.message,
            },
        }));

        if (
            !hasYearError.value &&
            !hasPositionError.value &&
            !hasDeckError.value &&
            !hasTournamentError.value &&
            !hasPlaceError.value
        )
            return true;
        else return false;
    }

    async function submitHandler(event: any) {
        event.preventDefault();
        setIsLoading(true);

        const isFormValid: boolean = validateForm();

        if (isFormValid && playerId) {
            const data: TopT = {
                year: parseInt(formData.year),
                position: formData.position,
                deck: formData.deck,
                tournament: formData.tournament,
                place: formData.place,
                playerId,
            };

            const res = await TOPS_API.create(data);

            if (res) {
                activateSnackbar("Top inserita con successo", "success");
                setFormData(formDataInitialState);
                await getDataHandler();
            }
        }

        setIsLoading(false);
    }

    const form = isAdminSection && (
        <Card>
            <form
                onSubmit={submitHandler}
                className="flex flex-row justify-between items-center gap-5 mobile:flex-col"
            >
                <Input
                    name="year"
                    placeholder="Anno"
                    value={formData.year}
                    onChange={inputHandler}
                    error={errors.year}
                    isDarkMode={isDarkMode}
                />
                <Input
                    name="position"
                    placeholder="Posizione"
                    value={formData.position}
                    onChange={inputHandler}
                    error={errors.position}
                    isDarkMode={isDarkMode}
                />
                <Input
                    name="deck"
                    placeholder="Deck"
                    value={formData.deck}
                    onChange={inputHandler}
                    error={errors.deck}
                    isDarkMode={isDarkMode}
                />
                <Input
                    name="tournament"
                    placeholder="Torneo"
                    value={formData.tournament}
                    onChange={inputHandler}
                    error={errors.tournament}
                    isDarkMode={isDarkMode}
                />
                <Input
                    name="place"
                    placeholder="Luogo"
                    value={formData.place}
                    onChange={inputHandler}
                    error={errors.place}
                    isDarkMode={isDarkMode}
                />
                <button
                    type="submit"
                    className="transition-all duration-200 hover:opacity-50"
                >
                    <AddIcon className="text-primary text-[3em] mobile:text-[4em]" />
                </button>
            </form>
        </Card>
    );

    function onDeleteHandler(
        event: MouseEvent<HTMLButtonElement>,
        top: TopT
    ): void {
        event.preventDefault();
        setSelectedTop(top);
        setIsDeleteModalOpen(true);
    }

    const topsComponent = tops.length > 0 && years.length > 0 && (
        <div className="flex flex-col gap-10">
            {years.map((year) => (
                <div key={year} className="flex flex-col gap-5">
                    <span
                        className={`transition-all duration-200 text-2xl font-bold
                            ${isAdminSection && "text-primary"}
                            ${
                                !isAdminSection &&
                                (isDarkMode ? "text-white" : "text-black")
                            }
                        `}
                    >
                        {year}
                    </span>
                    {tops.map((top: TopT) => {
                        const isTopVisible: boolean = top.year === year;
                        const positionAndDeck: string = `${top.position}° posto (${top.deck})`;

                        return (
                            isTopVisible && (
                                <div
                                    key={top.id}
                                    className={`w-full rounded-lg px-5 py-3 justify-between flex flex-row items-center 
                                        ${
                                            isAdminSection &&
                                            "bg-pink-transparent"
                                        }
                                        ${
                                            !isAdminSection &&
                                            (isDarkMode
                                                ? "bg-black"
                                                : "bg-white")
                                        }
                                    `}
                                >
                                    <span
                                        className={`transition-all duration-200
                                            ${
                                                isDarkMode
                                                    ? "text-white"
                                                    : "text-black"
                                            }
                                        `}
                                    >
                                        <span className="text-primary font-bold">
                                            {positionAndDeck}
                                        </span>
                                        {` | ${top.tournament} | ${top.place}`}
                                    </span>
                                    {isAdminSection && (
                                        <IconButton
                                            onClick={(
                                                event: MouseEvent<HTMLButtonElement>
                                            ) => onDeleteHandler(event, top)}
                                            className="bg-pink-transparent"
                                        >
                                            <DeleteIcon className="text-2xl text-primary" />
                                        </IconButton>
                                    )}
                                </div>
                            )
                        );
                    })}
                </div>
            ))}
        </div>
    );

    async function deleteHandler() {
        setIsLoading(true);

        if (selectedTop?.id) {
            const res = await TOPS_API.delete(selectedTop?.id);

            if (res) {
                setIsDeleteModalOpen(false);
                activateSnackbar("Top eliminata con successo", "success");
                await getDataHandler();
            } else activateSnackbar("Impossibile eliminare la top", "error");
        }

        setIsLoading(false);
    }

    const modal = (
        <Modal
            title="Elimina top"
            cancelBtnText="No"
            isDarkMode={isDarkMode}
            submitBtnText="Sì"
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            submitHandler={deleteHandler}
        >
            <span
                className={`transition-all duration-200 text-lg
                    ${isDarkMode ? "text-white" : "text-black"}
                `}
            >
                Confermi di voler eliminare la top
                <span className="text-primary ml-1 mr-1">{`${selectedTop?.position}° posto`}</span>
                a
                <span className="text-primary ml-1">{`${selectedTop?.place}`}</span>
                ?
            </span>
        </Modal>
    );

    return (
        <>
            <div className="flex flex-col gap-10">
                {title}
                {form}
                {topsComponent}
            </div>
            {modal}
        </>
    );
};

export default Tops;
