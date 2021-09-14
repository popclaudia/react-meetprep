import { useMemo } from 'react';
import { API_ENDPOINTS } from './endpoints';

export function useAPIRequester() {

    const endpoints = API_ENDPOINTS;

    const API_CALLS = useMemo(() =>
        Object.fromEntries(
            Object.entries(endpoints).map(
                ([key, value]) => [key, (body, callback) => {
                    fetch(value.url, {
                        method: value.method,
                        headers: new Headers({
                            ...value.headers,
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        }),
                        body: body ? JSON.stringify(body) : null,
                    }).then(function (response) {
                        if (response.ok) {
                            response.json().then(json => callback(json));
                        } else {
                            response.json().then((error) => callback(error));
                        }
                    })
                }])
        ), [endpoints])

    return API_CALLS;
}



export function APIRequester2() {

    const endpoints = API_ENDPOINTS;

    const API_CALLS = 
        Object.fromEntries(
            Object.entries(endpoints).map(
                ([key, value]) => [key, async (body) => {
                    const response = await fetch(value.url, {
                        method: value.method,
                        headers: new Headers({
                            ...value.headers,
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        }),
                        body: body ? JSON.stringify(body) : null,
                    });
                    return await response.json();
                }])
        )

    return API_CALLS;
}