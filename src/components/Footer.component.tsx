import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

// Assets
import {
    EmailIcon,
    InstagramIcon,
    LocationIcon,
    YouTubeIcon,
} from "../assets/icons";

// Types
import { FooterI, RouteT } from "../types";

interface ColumnI {
    children: ReactNode;
    title: string | undefined;
}

interface SocialI {
    link: string;
    icon: any;
}

const Footer: FC<FooterI> = ({ isDarkMode, routes, urlSection }) => {
    const Column = ({ children, title }: ColumnI) => (
        <div className="flex flex-col pt-5 gap-3">
            <span
                className={`transition-all duration-200 text-xl uppercase font-bold
                    ${isDarkMode ? "text-white" : "text-black"}
                `}
            >
                {title}
            </span>
            {children}
        </div>
    );

    const Social = ({ link, icon }: SocialI) => (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className={`transition-all duration-200 p-3 flex justify-center items-center rounded-full border-2 bg-pink-transparent border-primary hover:text-primary 
                ${isDarkMode ? "text-white" : "text-black"}
            `}
        >
            {icon}
        </a>
    );

    const columns = (
        <div className="flex flex-row justify-between">
            <Column title={process.env.REACT_APP_WEBSITE_NAME}>
                <a
                    href={`mailto: ${process.env.REACT_APP_EMAIL}`}
                    className={`flex flex-row items-center gap-2 hover:text-primary transition-all duration-200
                        ${isDarkMode ? "text-white" : "text-black"}
                    `}
                >
                    <EmailIcon className="text-2xl" />
                    <span className="font-bold text-lg">
                        {process.env.REACT_APP_EMAIL}
                    </span>
                </a>
                <div
                    className={`flex flex-row items-center gap-2 transition-all duration-200
                        ${isDarkMode ? "text-white" : "text-black"}
                    `}
                >
                    <LocationIcon className="text-2xl" />
                    <span className="text-lg">
                        {process.env.REACT_APP_COUNTRY}
                    </span>
                </div>
            </Column>
            <Column title="Collegamenti">
                <div className="text-center flex flex-col gap-3">
                    {routes.map((route: RouteT) => {
                        const currentSection: string = route.path.split("/")[1];
                        const isRouteActive: boolean =
                            currentSection === urlSection;

                        return (
                            !route.isHidden && (
                                <Link
                                    key={route.path}
                                    to={route.path}
                                    className={`hover:text-primary transition-all duration-200
                                        ${
                                            isRouteActive &&
                                            "text-primary font-bold"
                                        }
                                        ${
                                            isDarkMode && !isRouteActive
                                                ? "text-white"
                                                : "text-black"
                                        }
                                    `}
                                >
                                    {route.name}
                                </Link>
                            )
                        );
                    })}
                </div>
            </Column>
            <Column title="Social">
                <div className="flex flex-row items-center gap-5">
                    <Social
                        link="https://www.instagram.com/majin.players/"
                        icon={<InstagramIcon className="text-2xl" />}
                    />
                    <Social
                        link="https://www.youtube.com/@majin.players"
                        icon={<YouTubeIcon className="text-2xl" />}
                    />
                </div>
            </Column>
        </div>
    );

    const copyrightText: string = `@ ${process.env.REACT_APP_YEAR} - ${process.env.REACT_APP_WEBSITE_NAME}, made by
            Kevin De Marchi - All rights reserved`;

    const copyright = (
        <span
            className={`transition-all duration-200 text-md text-left 
                ${isDarkMode ? "text-gray-300" : "text-darkgray"}
            `}
        >
            {copyrightText}
        </span>
    );

    return (
        <div className="absolute bottom-0 w-full py-20 px-40 flex flex-col gap-10">
            {columns}
            {copyright}
        </div>
    );
};

export default Footer;
