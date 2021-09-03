import React from 'react';
import { Link, Route } from 'react-router-dom';
import './componentsStyle.css'
import { logOut } from './service/apiCalls';
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this)
    }

    logOut() {
        logOut((result) => {
            if (result) {
                localStorage.clear();
                this.props.isLogged(false);
            }

        });

    }

    render() {

        return (
            <div className='header'>
                <h2>
                    Header
                </h2>
                <div>
                    {!(this.props.isLoggedIn) &&
                        (<Link to="/login" > logIn </Link>)
                    }
                    {this.props.isLoggedIn &&
                        <Link onClick={this.logOut} to="/" > logOut </Link>
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

}


export default Header;