import { FC, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

// Assets
import logoImg from "../assets/images/logo.png";
import { MoonIcon, SunIcon } from "../assets/icons";

// Components
import IconButton from "./IconButton.component";

// Types
import { NavbarI } from "../types";

const Navbar: FC<NavbarI> = ({
    isAdminSection,
    urlSection,
    routes,
    isDarkMode,
    themeHandler,
}) => {
    const navigate = useNavigate();

    const themeIcon = isDarkMode ? (
        <MoonIcon className="text-2xl text-primary" />
    ) : (
        <SunIcon className="text-2xl text-primary" />
    );

    return (
        <div className="fixed flex w-full px-20 py-14 justify-between items-center z-[10]">
            <div className="flex flex-row items-center gap-10">
                <button
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        navigate(isAdminSection ? "/admin" : "/");
                    }}
                >
                    <img
                        src={logoImg}
                        alt="Impossibile visualizzare l'immagine."
                        className="transition-all duration-200 w-20 hover:opacity-50"
                    />
                </button>
                <div className="flex flex-row items-center">
                    {routes.map((route) => {
                        const currentSection = isAdminSection
                            ? route.path.split("/")[2]
                            : route.path.split("/")[1];
                        const isRouteActive = currentSection === urlSection;

                        return (
                            !route?.isHidden && (
                                <Link
                                    key={route.path}
                                    to={route.path}
                                    className={`transition-all duration-200 px-5 py-2
                                        ${
                                            isRouteActive
                                                ? "bg-primary"
                                                : "bg-transparent hover:bg-pink-transparent"
                                        }
                                    `}
                                >
                                    <span
                                        className={`text-xl font-bold transition-all duration-200
                                            ${
                                                isRouteActive && isDarkMode
                                                    ? "text-black"
                                                    : isRouteActive
                                                    ? "text-white"
                                                    : "text-primary"
                                            }
                                        `}
                                    >
                                        {route.name}
                                    </span>
                                </Link>
                            )
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-row gap-10">
                <IconButton
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        themeHandler();
                    }}
                >
                    {themeIcon}
                </IconButton>
            </div>
        </div>
    );
};

export default Navbar;
