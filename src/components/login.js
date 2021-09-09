import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useAPIRequester } from '../service/apiRequester';

function Login(props) {

    const [isWrong, setIsWrong] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { logIn } = useAPIRequester();

    const handleLogin = (email, password) => {

        const body = { email: email, password: password };
        logIn(body, (result) => {
            if (result.status === 'success') {
                props.isLoggedIn(true);
                localStorage.setItem('user-data', JSON.stringify(result.data));
                localStorage.setItem('token', result.data.authentication.access_token);
                setIsLoggedIn(true);
            }
            else {
                console.log('Errr')
                setIsWrong(true);
            }
        });
    }

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('*Required'),
        password: Yup.string().required('*Required'),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    handleLogin(values.email, values.password );
                }}
            >
                <Form id="login-form">
                    <h1>Login</h1>

                    <label htmlFor="email"><b>Email</b></label>
                    <Field type="email" name="email" placeholder="email" />
                    <ErrorMessage name="email" component="div" className='errorMessage' />

                    <label htmlFor="password"><b>Password</b></label>
                    <Field type="password" name="password" placeholder="password" />
                    <ErrorMessage name="password" component="div" className='errorMessage' />

                    <button type="submit">Login</button>
                    {
                        isWrong &&
                        <p className='invalidCredentials'> Wrong username or password! </p>
                    }
                    {
                        isLoggedIn &&
                        <Redirect to='contacts'></Redirect>
                    }
                </Form>

            </Formik>

        </div>
    );

}


export default Login;