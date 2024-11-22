import { FC, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

// Assets
import logoImg from "../assets/images/logo.png";
import { LogoutIcon, MoonIcon, SunIcon } from "../assets/icons";

// Components
import IconButton from "./IconButton.component";

// Types
import { SidebarI } from "../types";

const Sidebar: FC<SidebarI> = ({
    isAdminSection,
    urlSection,
    routes,
    isDarkMode,
    themeHandler,
    logoutHandler,
    isActive,
    stateHandler,
}) => {
    const navigate = useNavigate();

    const themeIcon = isDarkMode ? (
        <MoonIcon className="text-2xl text-primary" />
    ) : (
        <SunIcon className="text-2xl text-primary" />
    );

    return (
        <div
            className={`fixed flex w-full left-0 z-[900] h-[100vh] justify-center items-center flex-col gap-10 transition-all duration-200
                ${isDarkMode ? "bg-black" : "bg-white"}
                ${isActive ? "top-0" : "top-[-100%] mobile:top-[-120%]"}
            `}
        >
            <button
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    navigate(isAdminSection ? "/admin" : "/");
                }}
            >
                <img
                    src={logoImg}
                    onClick={() => stateHandler()}
                    alt="Impossibile visualizzare l'immagine."
                    className="transition-all duration-200 w-40 hover:opacity-50"
                />
            </button>
            <div className="flex flex-col items-center gap-5">
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
                                onClick={() => stateHandler()}
                                className={`transition-all duration-200 px-5 py-2
                                        ${
                                            isRouteActive
                                                ? "bg-primary"
                                                : "bg-transparent hover:bg-pink-transparent"
                                        }
                                    `}
                            >
                                <span
                                    className={`text-2xl font-bold transition-all duration-200
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
            <div className="flex flex-row gap-10">
                <IconButton
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        themeHandler();
                    }}
                >
                    {themeIcon}
                </IconButton>
                {isAdminSection && (
                    <button
                        onClick={(event: MouseEvent<HTMLButtonElement>) => {
                            event.preventDefault();
                            stateHandler();
                            logoutHandler();
                        }}
                    >
                        <LogoutIcon
                            className={`text-3xl transition-all duration-200 hover:text-primary
                                ${isDarkMode ? "text-white" : "text-black"}
                        `}
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;