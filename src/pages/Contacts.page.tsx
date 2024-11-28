import { FC, ReactNode } from "react";

// Assets
import { InstagramIcon, YouTubeIcon } from "../assets/icons";

// Utilities
import { setPageTitle } from "../utilities";

interface SocialI {
    link: string | undefined;
    children: ReactNode;
}

const Contacts: FC = () => {
    setPageTitle("Contatti");

    const Social = ({ link, children }: SocialI) => (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-200 border-2 cursor-pointer border-primary rounded-full bg-primary-transparent-2 py-5 w-full flex flex-row gap-3 justify-center items-center hover:opacity-50"
        >
            {children}
        </a>
    );

    return (
        <div className="flex flex-col justify-center items-center pb-[30vh] gap-20 mobile:gap-10 mobile:pb-[100vh] mobile:pt-20">
            <Social link={process.env.REACT_APP_INSTAGRAM_LINK}>
                <InstagramIcon className="text-primary text-[3em] mobile:text-3xl" />
                <span className="text-3xl font-bold uppercase text-primary mobile:text-2xl">
                    Instagram
                </span>
            </Social>
            <Social link={process.env.REACT_APP_YOUTUBE_LINK}>
                <YouTubeIcon className="text-primary text-[3em] mobile:text-3xl" />
                <span className="text-3xl font-bold uppercase text-primary mobile:text-2xl">
                    YouTube
                </span>
            </Social>
        </div>
    );
};

export default Contacts;
