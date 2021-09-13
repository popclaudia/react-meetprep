import React, { useState } from 'react';
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import { private_routes } from '../route/PrivateRoute';
import { public_routes } from '../route/PublicRoute';

function Main() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
    const isLogged = (param) => {
        setIsLoggedIn(param);
    }

    return (
        <div>
            <Router>
                <HeaderContainer isLogged={isLogged} isLoggedIn={isLoggedIn}/>
                <div id={isLoggedIn ? 'private-content' : 'public-content'}>
                    <Switch>
                        {
                            public_routes.map(
                                ({ path, Component }) =>
                                    <Route exact path={path}> <Component isLoggedIn={isLogged}/></Route>)
                        }
                        {
                            isLoggedIn ? private_routes.map(
                                ({ path, Component }) =>
                                    <Route exact path={path}> <Component isLoggedIn={isLogged}/> </Route>) : <Redirect to="/" />
                        }
                    </Switch>
                </div>
            </Router>
        </div>
    );


}


export default Main;