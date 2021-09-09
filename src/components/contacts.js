import React, { useState, useEffect } from 'react';
import { useAPIRequester } from '../service/apiRequester';

function Contacts(props) {

    const [contacts, setContacts] = useState(null);

    const { getContacts } = useAPIRequester();

    useEffect(() => {
        getContacts(null, (result) => {
            if (result.status === 'success') {
                setContacts(result.data.items);
                props.contacts(result.data.items);
            }
        });
    }, []);

    return (
        <div className='contacts'>
        <h3>Selected contact: {props.selectedContact}</h3>
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