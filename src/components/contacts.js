import React from 'react';
import { getContacts } from '../service/apiCalls';


class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
        }
    }

    componentDidMount() {
        document.getElementById('content').style.backgroundColor = 'white';
        this.fetchContacts();
    }

    fetchContacts() {
        getContacts((response) => {
            console.log(response);
            this.setState({
                contacts: response.data.items,
            });
        });
    }

    createContact(fn, ln, email) {

        return (
            <p>{fn}</p>
        )
    }

    renderContacts() {
        const items = []

        this.state.contacts.forEach(contact => {
            items.push(
                <tr>
                    <td>{contact.first_name}</td>
                    <td>{contact.last_name}</td>
                    <td>{contact.email}</td>
                </tr>

            )
        });
        return items;

    }

    render() {

        return (
            <div className='contacts'>
                <h1>Contacts</h1>
                <table class='table'>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th> Email</th>
                    </tr>
                    {this.state.contacts && this.renderContacts()}
                </table>

            </div>
        );
    }

}


export default Contacts;