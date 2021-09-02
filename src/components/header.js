import React from 'react';
import { Link, Route} from 'react-router-dom';
import './componentsStyle.css'
class Header extends React.Component {


    render() {

        return (
            <div className='header'>
                <h2>
                    Header
                </h2>
                <div>
                    <Link to="/login" >
                        {
                            localStorage.getItem('token') ? 'logOut' : 'logIn'
                        }
                    </Link>
                    <Route  path='/'>
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