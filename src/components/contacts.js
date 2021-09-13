import React, { useEffect } from 'react';
import { useAPIRequester } from '../service/apiRequester';

function Contacts({contacts, selectedContact, actions}) {

    const { getContacts } = useAPIRequester();

    useEffect(() => {
        getContacts(null, (result) => {
            if (result.status === 'success') {
                console.log('Contacts')
                actions.getContacts(result.data.items);
            }
        });
    }, []);

    return (
        <div className='contacts'>
        <h3>Selected contact: {selectedContact}</h3>
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