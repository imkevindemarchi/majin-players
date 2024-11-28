import {
    ChangeEvent,
    FC,
    MouseEvent,
    useContext,
    useEffect,
    useState,
} from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

// Api
import { IMAGES_API, PLAYERS_API } from "../../api";

// Assets
import { SaveIcon, UserIcon } from "../../assets/icons";

// Components
import {
    Card,
    GoBackBtn,
    IconButton,
    Input,
    InputFile,
    TextArea,
    Tops,
} from "../../components";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../../providers";

// Types
import {
    ErrorT,
    LoaderContextI,
    PlayerT,
    SnackbarContextI,
    ThemeContextI,
} from "../../types";

// Utilities
import {
    checkEmail,
    checkFormField,
    checkFormFieldImage,
    checkFormFieldYear,
    setPageTitle,
} from "../../utilities";

interface FormDataI {
    id: string;
    name: string;
    surname: string;
    birthYear: string;
    favouriteCard: string;
    favouriteDeck: string;
    email: string;
    instagramLink: string;
    description: string;
    image: File | null;
}

const formDataInitialState: FormDataI = {
    id: "",
    name: "",
    surname: "",
    birthYear: "",
    favouriteCard: "",
    favouriteDeck: "",
    email: "",
    instagramLink: "",
    description: "",
    image: null,
};

interface ErrorsI {
    name: ErrorT;
    surname: ErrorT;
    image: ErrorT;
    birthYear: ErrorT;
    email: ErrorT;
}

const errorsInitialValues: ErrorsI = {
    name: {
        value: false,
        message: null,
    },
    surname: {
        value: false,
        message: null,
    },
    image: {
        value: false,
        message: null,
    },
    birthYear: {
        value: false,
        message: null,
    },
    email: {
        value: false,
        message: null,
    },
};

const Player: FC = () => {
    const { state: theme } = useContext(ThemeContext) as ThemeContextI;
    const [formData, setFormData] = useState<FormDataI>(formDataInitialState);
    const [errors, setErrors] = useState<ErrorsI>(errorsInitialValues);
    const { activateHandler: activateSnackbar } = useContext(
        SnackbarContext
    ) as SnackbarContextI;
    const navigate: NavigateFunction = useNavigate();
    const { setState: setIsLoading } = useContext(
        LoaderContext
    ) as LoaderContextI;
    const { id } = useParams();
    const [isImageUpdated, setIsImageUpdated] = useState<boolean>(false);

    const isEditMode: boolean = id ? true : false;
    const pageTitle: string = `${id ? "Modifica" : "Nuovo"} Giocatore`;
    const isDarkMode: boolean = theme === "dark";

    setPageTitle(pageTitle);

    async function getDataHandler() {
        if (id) {
            setIsLoading(true);

            const res = await PLAYERS_API.get(id);
            setFormData({
                ...res,
                birthYear: res.birthYear.toString(),
                image: res.id,
            });

            setIsLoading(false);
        }
    }

    useEffect(() => {
        isEditMode && getDataHandler();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (formData.image && typeof formData.image === "object") {
            let src = URL.createObjectURL(formData.image);
            let imagePreview: any = document.getElementById("image");
            if (imagePreview) imagePreview.src = src;
        }
    }, [formData.image]);

    const title = <span className="text-3xl text-primary">{pageTitle}</span>;

    const goBackBtn = <GoBackBtn isDarkMode={isDarkMode} />;

    function inputHandler(
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ): void {
        const { name, value }: { name: string; value: string } = event.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    function imageHandler(file: File): void {
        setFormData((prevState) => ({
            ...prevState,
            image: file,
        }));
        setIsImageUpdated(true);
    }

    const form = (
        <Card>
            <form className="flex flex-col gap-10 mobile:gap-5">
                <div className="flex justify-center items-center gap-10">
                    {formData.image && (
                        <img
                            id="image"
                            src={`${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/images/${formData?.id}`}
                            alt="Impossibile visualizzare l'immagine."
                            className="w-40 rounded-lg object-contain"
                        />
                    )}
                    <InputFile
                        value={formData.image}
                        onChange={imageHandler}
                        icon={<UserIcon className="text-3xl text-primary" />}
                        error={errors.image}
                    />
                </div>
                <div className="flex flex-row gap-20 mobile:flex-col mobile:gap-5">
                    <Input
                        name="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={inputHandler}
                        error={errors.name}
                        isDarkMode={isDarkMode}
                    />
                    <Input
                        name="surname"
                        placeholder="Cognome"
                        value={formData.surname}
                        onChange={inputHandler}
                        error={errors.surname}
                        isDarkMode={isDarkMode}
                    />
                    <Input
                        type="number"
                        name="birthYear"
                        placeholder="Anno di nascita"
                        value={formData.birthYear}
                        onChange={inputHandler}
                        error={errors.birthYear}
                        isDarkMode={isDarkMode}
                    />
                </div>
                <div className="flex flex-row gap-20 mobile:flex-col mobile:gap-5">
                    <Input
                        name="favouriteCard"
                        placeholder="Carta preferita"
                        value={formData.favouriteCard}
                        onChange={inputHandler}
                        isDarkMode={isDarkMode}
                    />
                    <Input
                        name="favouriteDeck"
                        placeholder="Mazzo preferito"
                        value={formData.favouriteDeck}
                        onChange={inputHandler}
                        isDarkMode={isDarkMode}
                    />
                    <Input
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={inputHandler}
                        error={errors.email}
                        isDarkMode={isDarkMode}
                    />
                </div>
                <Input
                    name="instagramLink"
                    placeholder="Link Instagram"
                    value={formData.instagramLink}
                    onChange={inputHandler}
                    isDarkMode={isDarkMode}
                />
                <TextArea
                    name="description"
                    placeholder="Descrizione"
                    value={formData.description}
                    onChange={inputHandler}
                    isDarkMode={isDarkMode}
                />
            </form>
        </Card>
    );

    const tops = isEditMode && (
        <Tops isDarkMode={isDarkMode} isAdminSection playerId={id} />
    );

    function validateForm(): boolean {
        const currentYear: number = new Date().getFullYear();
        const allowedMaxYear: number = currentYear - 10;

        const hasNameError: ErrorT = checkFormField(formData.name);
        const hasSurnameError: ErrorT = checkFormField(formData.surname);
        const hasBirthYearError: ErrorT = checkFormFieldYear(
            formData.birthYear,
            allowedMaxYear
        );
        const hasEmailError: ErrorT = formData.email
            ? checkEmail(formData.email)
            : { value: false };
        const hasImageError = checkFormFieldImage(formData.image);

        setErrors((prevState) => ({
            ...prevState,
            name: {
                value: hasNameError.value,
                message: hasNameError.message,
            },
            surname: {
                value: hasSurnameError.value,
                message: hasSurnameError.message,
            },
            birthYear: {
                value: hasBirthYearError.value,
                message: hasBirthYearError.message,
            },
            email: {
                value: hasEmailError.value,
                message: hasEmailError.message,
            },
            image: {
                value: hasImageError.value,
                message: hasImageError.message,
            },
        }));

        if (
            !hasNameError.value &&
            !hasSurnameError.value &&
            !hasBirthYearError.value &&
            !hasEmailError.value &&
            !hasImageError.value
        )
            return true;
        else return false;
    }

    async function submitHandler(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsLoading(true);

        const isFormValid: boolean = validateForm();

        if (isFormValid) {
            if (isEditMode && id) {
                const data: PlayerT = {
                    id: formData.id,
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    birthYear: parseInt(formData.birthYear),
                    favouriteCard: formData.favouriteCard,
                    favouriteDeck: formData.favouriteDeck,
                    description: formData.description,
                    instagramLink: formData.instagramLink,
                };

                const res = await PLAYERS_API.update(data, id);

                if (res && typeof res === "string") {
                    if (isImageUpdated && formData.image) {
                        const deleteImageRes: boolean = await IMAGES_API.delete(
                            id
                        );

                        if (deleteImageRes) {
                            const imageRes = await IMAGES_API.add(
                                res,
                                formData.image
                            );

                            if (imageRes) {
                                activateSnackbar(
                                    "Giocatore aggiornato con successo",
                                    "success"
                                );
                                await getDataHandler();
                            } else {
                                activateSnackbar(
                                    "Impossibile aggiungere l'immagine al giocatore",
                                    "error"
                                );
                            }
                        } else {
                            activateSnackbar(
                                "Impossibile cancellare l'immagine precedente",
                                "error"
                            );
                        }
                    } else {
                        activateSnackbar(
                            "Giocatore aggiornato con successo",
                            "success"
                        );
                        await getDataHandler();
                    }
                } else {
                    activateSnackbar(
                        "Impossibile aggiornare il giocatore",
                        "error"
                    );
                }
            } else {
                const data: PlayerT = {
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    birthYear: parseInt(formData.birthYear),
                    favouriteCard: formData.favouriteCard,
                    favouriteDeck: formData.favouriteDeck,
                    description: formData.description,
                    instagramLink: formData.instagramLink,
                };

                const res = await PLAYERS_API.create(data);
                if (res && typeof res !== "boolean" && formData.image) {
                    const imageRes = await IMAGES_API.add(res, formData.image);
                    if (imageRes) {
                        activateSnackbar(
                            "Giocatore creato con successo",
                            "success"
                        );
                        navigate(`/admin/players/${res}`);
                    } else {
                        activateSnackbar(
                            "Impossibile aggiungere l'immagine al giocatore",
                            "error"
                        );
                    }
                } else {
                    activateSnackbar(
                        "Impossibile creare il giocatore",
                        "error"
                    );
                }
            }
        }

        setIsLoading(false);
    }

    const btn = (
        <div className="fixed bottom-10 right-10 mobile:bottom-5 mobile:right-5">
            <IconButton onClick={submitHandler} className="px-4 py-4 bg-pink-2">
                <SaveIcon className="text-primary text-3xl" />
            </IconButton>
        </div>
    );

    return (
        <div className="flex flex-col gap-10">
            {title}
            {goBackBtn}
            {form}
            {tops}
            {btn}
        </div>
    );
};

export default Player;
