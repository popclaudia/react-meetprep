import React, { useState } from 'react';
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { private_routes } from '../route/PrivateRoute';
import { public_routes } from '../route/PublicRoute';
import Header from './header';

function Main() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
    const [contacts, setContacts] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);

    const isLogged = (param) => {
        setIsLoggedIn(param);
    }

    const getContacts = (param) => {
        setContacts(param);
    }

    const getSelectedContact = (param) => {
        setSelectedContact(param);
    }

    return (
        <div>
            <Router>
                <Header isLogged={isLogged} isLoggedIn={isLoggedIn}  contacts = {contacts}  getSelectedContact = {getSelectedContact}/>
                <div id={isLoggedIn ? 'private-content' : 'public-content'}>
                    <Switch>
                        {
                            public_routes.map(
                                ({ path, Component }) =>
                                    <Route exact path={path}> <Component isLoggedIn={isLogged} /></Route>)
                        }
                        {
                            isLoggedIn ? private_routes.map(
                                ({ path, Component }) =>
                                    <Route exact path={path}> <Component isLoggedIn={isLogged} contacts = {getContacts} selectedContact={selectedContact}/> </Route>) : <Redirect to="/" />
                        }
                    </Switch>
                </div>
            </Router>
        </div>
    );


}


export default Main;