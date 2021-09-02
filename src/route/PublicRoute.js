import Home from "../components/home";
import Login from "../components/login";
import Register from "../components/register";

export const public_routes = [{
        path: '/',
        Component: Home,
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/register',
        Component: Register,
    },
]