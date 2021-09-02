import React from 'react';
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { private_routes } from '../route/PrivateRoute';
import { public_routes } from '../route/PublicRoute';
import Header from './header';

class Main extends React.Component {

    render() {
        const privateR = private_routes.map(
            ({ path, Component }) => <Route exact path={path}> <Component /> </Route>);
        const publicR = public_routes.map(
            ({ path, Component }) => <Route exact path={path}><Component /></Route>);

        return (
            <div>

                <Router>
                    <Header />
                    <div className='content'>
                        <Switch>
                        {
                            publicR
                        }
                        {
                            localStorage.getItem('token') ? privateR : <Redirect to="/" />
                        }
                    </Switch> 
                    </div>
                   
                </Router>


            </div>
        );
    }

}


export default Main;