import React, { useState, useEffect } from 'react';
import { CONTACTS } from '../service/endpoints';


function Contacts() {

    const [contacts, setContacts] = useState(null);

    useEffect(() => {
        fetch(
            CONTACTS.GET_CONTACTS,
            {
                method: "GET",
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Security-Token': 'test',
                })
            }
        ).then(function (response) {
            if (response.ok) {
                response.json().then(json => setContacts(json.data.items));
            } else {
                response.json().then(() => setContacts(null));
            }
        })
    }, []);



    return (
        <div className='contacts'>
            <h1>Contacts</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th> Email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        contacts &&
                        contacts.map((contact) =>
                            <tr>
                                <td>{contact.first_name}</td>
                                <td>{contact.last_name}</td>
                                <td>{contact.email}</td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    );
}


export default Contacts;