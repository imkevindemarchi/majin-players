// Pages
import { LogIn } from "./pages";

export const ROUTES = [
    { path: "/", name: "Home", isHidden: true, element: <></> },
    { path: "/players", name: "Giocatori", element: <></> },
    { path: "/equipments", name: "Equipaggiamento", element: <></> },
    { path: "/sponsorships", name: "Sponsor", element: <></> },
    {
        path: "/style-guide",
        name: "Style Guide",
        isHidden: true,
        element: <></>,
    },
    { path: "/log-in", name: "Log In", isHidden: true, element: <LogIn /> },
];

export const ADMIN_ROUTES = [
    { path: "/admin", name: "Dashboard", isHidden: true, element: <></> },
    { path: "/admin/players", name: "Giocatori", element: <></> },
    { path: "/admin/equipments", name: "Equipaggiamento", element: <></> },
    { path: "/admin/sponsorships", name: "Sponsor", element: <></> },
];
