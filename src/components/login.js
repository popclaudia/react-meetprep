import React from 'react';
import { Redirect } from 'react-router';
import { login } from './service/apiCalls';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this)
        this.state = {
            isWrong: false,
            isLoggedIn: false,

        }
    }

    componentDidMount() {
        console.log('logg')
        document.getElementById('content').style.backgroundColor = 'rgba(0,0,0,0)';
    }

    handleLogin() {
        let user = document.getElementById('email').value;
        let pass = document.getElementById('password').value;
        login(user, pass, (result) => {
            if (result) {
                this.props.isLoggedIn(true);
                localStorage.setItem('user-data', JSON.stringify(result.data));
                localStorage.setItem('token', result.data.authentication.access_token);
                this.setState({
                    isLoggedIn: true,
                    isSorrect: true,
                });
            }
            else {
                console.log('Errr')
                this.setState({
                    isWrong: true
                })
                console.log(this.state.isCorrect)
            }
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
                    {
                        this.state.isWrong &&
                        <p className='invalidCredentials'> Wrong username or password! </p>
                    }
                    {
                        this.state.isLoggedIn &&
                        <Redirect to='contacts'></Redirect>
                    }
                </form>
            </div>
        );
    }
}


export default Login;