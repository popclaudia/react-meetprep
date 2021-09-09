import { Form, Formik, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import * as Yup from 'yup';
import { useAPIRequester } from '../service/apiRequester';

function Register() {

    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [newUser, setNewUser] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        linkedIn: null,
        preferredIndustries: '',
        attendingReasons: '',
    });

    const {register} = useAPIRequester();


    const handleRegister = () => {
        let attendingReasons = newUser.attendingReasons;
        attendingReasons = attendingReasons.split(",");

        let prefferedIndustries = newUser.preferredIndustries;
        const pr_ind = {};
        prefferedIndustries = prefferedIndustries.split(';')
        prefferedIndustries.forEach(ind => {
            let i = ind.split(':')
            if (i.length > 1) {
                let t = i[1].split(',')
                const ts = [];
                t.forEach(topic => {
                    ts.push(parseInt(topic))
                })
                pr_ind[i[0]] = ts;
            }
        })
        const requestData = {
            last_name: newUser.lastName,
            first_name: newUser.firstName,
            email: newUser.email,
            linkedin: false,
            password: newUser.password,
            attending_reasons: attendingReasons,
            preferred_industries: pr_ind,
        }
        register(requestData, (result) => {
            if (result.status=='success') {
                setIsRegistered(true);
            }
            else {
                console.log('Errr')
                setErrorMessage(JSON.stringify(result.errors));
            }
        });
    }

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('*Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('*Required'),
        email: Yup.string().email('Invalid email').required('*Required'),
        password: Yup.string()
            .min(6, 'The password must be at least 6 characters')
            .required('*Required'),
        attendingReasons: Yup.string()
            .trim()
            .matches(/^\d+(,\d+)*$/, 'Format required: number, number, number...')
            .required('*Required'),
    });

    return (
        <div className='Home'>
            <Formik
                validationSchema={SignupSchema}>
                <Form id='register-form'>
                    <h1>Register</h1>
                    <label htmlFor="first-name"><b>First Name</b></label>
                    <Field name="firstName" type="text" placeholder="First Name"
                        onChange={(event) =>
                            setNewUser({
                                ...newUser,
                                first_name: event.target.value,
                            })} />
                    <ErrorMessage name="firstName" component="div" className='errorMessage' />

                    <label htmlFor="last-name"><b>Last Name</b></label>
                    <Field name="lastName" type="text" placeholder="Last Name"
                        onChange={(event) => setNewUser({
                            ...newUser,
                            last_name: event.target.value,
                        })} />
                    <ErrorMessage name="lastName" component="div" className='errorMessage' />

                    <label htmlFor="email"><b>Email</b></label>
                    <Field name="email" type="email" placeholder="email"
                        onChange={(event) => setNewUser({
                            ...newUser,
                            email: event.target.value,
                        })} />
                    <ErrorMessage name="email" component="div" className='errorMessage' />

                    <label htmlFor="linkedIn"><b>LinkedIn</b></label>
                    <Field type="text" placeholder="LinkedIn"
                        onChange={(event) => setNewUser({
                            ...newUser,
                            linkedIn: event.target.value,
                        })} />

                    <label htmlFor="password"><b>Password</b></label>
                    <Field name='password' type="password" placeholder="password"
                        onChange={(event) => setNewUser({
                            ...newUser,
                            password: event.target.value,
                        })} />
                    <ErrorMessage name="password" component="div" className='errorMessage' />

                    <label htmlFor="attending-reasons"><b>Attending Reasons</b></label>
                    <Field name='attendingReasons' type="text" placeholder="Ex: 3, 5, 7"
                        onChange={(event) => setNewUser({
                            ...newUser,
                            attending_reasons: event.target.value,
                        })} />
                    <ErrorMessage name="attendingReasons" component="div" className='errorMessage' />

                    <label htmlFor="preferred-industries"><b>Preferred Industries</b></label>
                    <Field type="text" placeholder="Ex: 1: 13; 3: 1, 5; 5: 2, 10"
                        onChange={(event) => setNewUser({
                            ...newUser,
                            preferred_industries: event.target.value,
                        })} />

                    <button type="button" onClick={handleRegister}>Register</button>

                    <p className='error'>{errorMessage}</p>
                </Form>
            </Formik>
            {
                isRegistered &&
                <Redirect to='/login'></Redirect>
            }
        </div>
    );
}

export default Register;