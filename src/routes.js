// Pages
import { Home, Login } from "./pages";

export const ROUTES = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/log-in",
        element: <Login />,
    },
];

export const ADMIN_ROUTES = [
    {
        path: "/admin",
        element: <span>Ciao</span>,
    },
];
