import { HOST } from "./host"

const BASE_API = HOST.backend_api;

export const AUTH = {
    LOGIN: `${BASE_API}/login`,
    LOGOUT: `${BASE_API}/logout`,
    REGISTER: `${BASE_API}/register`,
};

export const CONTACTS = {
    GET_CONTACTS: `${BASE_API}/contacts`,
}