// Pages
import {
    AdminDashboard,
    AdminPlayers,
    AdminPlayer,
    AdminEquipments,
    AdminEquipment,
    AdminSponsorships,
    AdminSponsorship,
} from "./pages/admin";
import {
    LogIn,
    StyleGuide,
    Home,
    Players,
    Player,
    Equipments,
    Sponsorships,
    Contacts,
} from "./pages";

export const ROUTES = [
    { path: "/", name: "Home", isHidden: true, element: <Home /> },
    {
        path: "/players",
        name: "Giocatori",
        element: <Players />,
    },
    {
        path: "/players/:id",
        isHidden: true,
        element: <Player />,
    },
    { path: "/equipments", name: "Equipaggiamenti", element: <Equipments /> },
    { path: "/sponsorships", name: "Sponsor", element: <Sponsorships /> },
    { path: "/contacts", name: "Contatti", element: <Contacts /> },
    {
        path: "/style-guide",
        name: "Style Guide",
        isHidden: true,
        element: <StyleGuide />,
    },
    { path: "/log-in", name: "Log In", isHidden: true, element: <LogIn /> },
];

export const ADMIN_ROUTES = [
    {
        path: "/admin",
        name: "Dashboard",
        isHidden: true,
        element: <AdminDashboard />,
    },
    {
        path: "/admin/players",
        name: "Giocatori",
        element: <AdminPlayers />,
    },
    {
        path: "/admin/players/new",
        element: <AdminPlayer />,
        isHidden: true,
    },
    {
        path: "/admin/players/:id",
        element: <AdminPlayer />,
        isHidden: true,
    },
    {
        path: "/admin/equipments",
        name: "Equipaggiamenti",
        element: <AdminEquipments />,
    },
    {
        path: "/admin/equipments/new",
        element: <AdminEquipment />,
        isHidden: true,
    },
    {
        path: "/admin/equipments/:id",
        element: <AdminEquipment />,
        isHidden: true,
    },
    {
        path: "/admin/sponsorships",
        name: "Sponsor",
        element: <AdminSponsorships />,
    },
    {
        path: "/admin/sponsorships/new",
        element: <AdminSponsorship />,
        isHidden: true,
    },
    {
        path: "/admin/sponsorships/:id",
        element: <AdminSponsorship />,
        isHidden: true,
    },
];
