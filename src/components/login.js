import React from 'react';
import { login } from './service/apiCalls';

class Login extends React.Component {

    handleLogin() {
        let user = document.getElementById('email').value;
        let pass = document.getElementById('password').value;
        login(user, pass, (result) =>{
            console.log(result);
        }
        
        );

    }

    render() {

        return (
            <div>
            <form id="login-form">
                <h1>Login</h1>
                <label htmlFor="email"><b>Email</b></label>
                <input type="email" placeholder="email" id="email" required />

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" placeholder="password" id="password" required />

                <button type="button" onClick={this.handleLogin}>Login</button>
                <p> </p>
                </form>
            </div>
        );
    }

}


export default Login;