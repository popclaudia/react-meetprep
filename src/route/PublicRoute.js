import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import LogInContainer from "../containers/LoginContainer";

export const public_routes = [{
        path: '/',
        Component: Home,
    },
    {
        path: '/login',
        Component: LogInContainer,
    },
    {
        path: '/register',
        Component: Register,
    },
]