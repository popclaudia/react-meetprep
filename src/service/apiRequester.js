import { API_ENDPOINTS } from './endpoints';

export function useAPIRequester() {

    const endpoints = API_ENDPOINTS;

    const endpointsMap = (obj, fn) =>
        Object.fromEntries(
            Object.entries(obj).map(
                ([k, v], i) => [k, fn(v, k, i)]
            )
        )

    const API_CALLS = endpointsMap(endpoints, v =>
        (body, callback) => fetch(v.url, {
            method: v.method,
            headers:new Headers( {
                ...v.headers, 
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
    );

    return API_CALLS;


}