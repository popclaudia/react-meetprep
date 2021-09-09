import React from 'react';
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { private_routes } from '../route/PrivateRoute';
import { public_routes } from '../route/PublicRoute';
import Header from './header';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.isLogged = this.isLogged.bind(this);
        this.state = {
            isLoggedIn: localStorage.getItem('token'),
        }
    }

    isLogged(param) {
        this.setState({
            isLoggedIn: param
        })
    }

    render() {
        const privateR = private_routes.map(
            ({ path, Component }) => <Route exact path={path}> <Component isLoggedIn={this.isLogged} /> </Route>);
        const publicR = public_routes.map(
            ({ path, Component }) => <Route exact path={path}> <Component isLoggedIn={this.isLogged} /></Route>);

        return (
            <div>

                <Router>
                    <Header isLogged={this.isLogged} isLoggedIn={this.state.isLoggedIn} />
                    <div id= {this.state.isLoggedIn ? 'private-content': 'public-content'}>
                        <Switch>
                            {
                                publicR
                            }
                            {
                                this.state.isLoggedIn ? privateR : <Redirect to="/" />
                            }
                        </Switch>
                    </div>

                </Router>


            </div>
        );
    }

}


export default Main;