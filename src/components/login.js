import React from 'react';
import { Redirect } from 'react-router';
import { login } from '../service/apiCalls';
import { Formik, Field, Form, ErrorMessage  } from "formik";
import * as Yup from 'yup';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isWrong: false,
            isLoggedIn: false,
            email: null,
            password: null,

        }
    }

    componentDidMount() {
        document.getElementById('content').style.backgroundColor = 'rgba(0,0,0,0)';
    }

    handleLogin = () => {

        login(this.state.email, this.state.password, (result) => {
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

        const LoginSchema = Yup.object().shape({
            email: Yup.string().email('Invalid email').required('*Required'),
          });

        return (
            <div>
                <Formik
                    validationSchema = {LoginSchema}>
                    <Form id="login-form">
                        <h1>Login</h1>
                        <label htmlFor="email"><b>Email</b></label>
                        <Field type="email" hname="email" placeholder="email" id="email"
                            onChange={(event) => this.setState({ email: event.target.value })}/>
                        <ErrorMessage name="email" component="div" className='errorMessage' />
                        <label htmlFor="password"><b>Password</b></label>
                        <Field type="password" placeholder="password" id="password"
                            onChange={(event) => this.setState({ password: event.target.value })}/>

                        <button type="button" onClick={this.handleLogin}>Login</button>
                        {
                            this.state.isWrong &&
                            <p className='invalidCredentials'> Wrong username or password! </p>
                        }
                        {
                            this.state.isLoggedIn &&
                            <Redirect to='contacts'></Redirect>
                        }
                    </Form>

                </Formik>

            </div>
        );
    }
}


export default Login;