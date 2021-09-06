import { HOST } from "./host";

export function login(email, password, callback) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Security-Token': 'test' },
        body: JSON.stringify({ email: email, password: password })
    };
    const URL = HOST.backend_api + '/login';
    const request = new Request(URL, requestOptions);
    fetch(request)
        .then(function(response) {
            if (response.ok) {
                response.json().then(json => callback(json));
            } else {
                response.json().then(err => callback(null));
            }
        })
        .catch(error => {
            console.log('Error: ' + error)
        })
}

export function logOut(callback) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Security-Token': 'test' }
    };
    const URL = HOST.backend_api + '/logout';
    const request = new Request(URL, requestOptions);
    fetch(request)
        .then(function(response) {
            if (response.ok) {
                response.json().then(json => callback(json));
            } else {
                response.json().then(err => callback(null));
            }
        })

}

export function getContacts(callback) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Security-Token': 'test' }
    };
    const URL = HOST.backend_api + '/contacts';
    const request = new Request(URL, requestOptions);
    fetch(request)
        .then(function(response) {
            if (response.ok) {
                response.json().then(json => callback(json));
            } else {
                response.json().then(err => callback(null));
            }
        })

}

export function register(requestData, callback) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Security-Token': 'test' },
        body: JSON.stringify(requestData)
    };
    const URL = HOST.backend_api + '/register';
    const request = new Request(URL, requestOptions);
    fetch(request)
        .then(function(response) {
            if (response.ok) {
                response.json().then(json => callback(json));
            } else {
                response.json().then(err => callback(err));
            }
        })
        .catch(error => {
            console.log('Error: ' + error)
        })

}