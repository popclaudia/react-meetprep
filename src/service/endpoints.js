import { HOST } from "./host"

const BASE_API = HOST.BASE_URL;

const headers = {
    'Content-Type': 'application/json',
    'Security-Token': 'test'
    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
}


export const API_ENDPOINTS = {
    logIn: {
        url: `${BASE_API}/login`,
        method: 'POST',
        headers: headers,
    },
    logOut: {
        url: `${BASE_API}/logout`,
        method: 'POST',
        headers: headers,
    },
    register: {
        url: `${BASE_API}/register`,
        method: 'POST',
        headers: headers,
    },
    getContacts: {
        url: `${BASE_API}/contacts`,
        method: 'GET',
        headers: headers,
    }

}