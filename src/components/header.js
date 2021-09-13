import React from 'react';
import { Link, Route } from 'react-router-dom';
import './componentsStyle.css';
import { useAPIRequester } from '../service/apiRequester';

function Header({ contacts, actions,...props}) {

    const { logOut } = useAPIRequester();

    const logout = () => {
        logOut(null, (result) => {
            if (result.status === 'success') {
                localStorage.clear();
                props.isLogged(false);
            }
        });
    }

    return (
        <div className='header'>
            <h2>
                Header
            </h2>
            <div>
                {
                    props.isLoggedIn &&
                    <select name="contacts" id="contacts" onChange={(event) => actions.selectContact(event.target.value)}>
                    <option value = 'none'>-</option>
                        {
                            contacts &&
                            contacts.map((contact) =>
                                <option value={contact.first_name + " " + contact.last_name}>{contact.first_name + " " + contact.last_name}</option>
                            )
                        }
                    </select>
                }
                {!(props.isLoggedIn) &&
                    (<Link to="/login" > logIn </Link>)
                }
                {props.isLoggedIn &&
                    <Link onClick={logout} to="/" > logOut </Link>
                }
                <Route exact path={['/', '/login']}>
                    <Link to="/register">
                        Register
                    </Link>
                </Route>
            </div>
        </div>
    );
}

export default Header;
