import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";

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