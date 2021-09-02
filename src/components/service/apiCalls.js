import { HOST } from "./host";

export function login(email, password, callback) {

    const requestOptions = {
        method: 'POST',
        headers: { 'security-token': 'test' },
        body: JSON.stringify({ email: email, password: password })
    };
    const URL = HOST.backend_api + '/login';
    fetch(URL, requestOptions)
        .then(function(response) {
            if (response.ok) {
                response.json().then(json => callback(json));
            } else {
                response.json().then(err => callback(null));
            }
        });
}