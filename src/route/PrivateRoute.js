import Contacts from "../components/contacts";
import Profile from "../components/profile";

export const private_routes = [{
        path: '/profile',
        Component: Profile,
    },
    {
        path: '/contacts',
        Component: Contacts,
    },
]