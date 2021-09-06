import { Form, Formik, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Redirect } from 'react-router';
import { register } from '../service/apiCalls';
import * as Yup from 'yup';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            errorMessage: null,
            newUser: {
                firstName: null,
                lastName: null,
                email: null,
                password: null,
                linkedIn: null,
                preferredIndustries: '',
                attendingReasons: '',
            },
        }
    }

    componentDidMount() {
        document.getElementById('content').style.backgroundColor = 'rgba(0,0,0,0)';
    }

    handleRegister = () => {
        let attendingReasons = this.state.newUser.attendingReasons;
        attendingReasons = attendingReasons.split(",");

        let prefferedIndustries = this.state.newUser.preferredIndustries;
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
            last_name: this.state.newUser.lastName,
            first_name: this.state.newUser.firstName,
            email: this.state.newUser.email,
            linkedin: false,
            password: this.state.newUser.password,
            attending_reasons: attendingReasons,
            preferred_industries: pr_ind,
        }
        register(requestData, (result) => {
            if (!result.errors) {
                this.setState({
                    isRegistered: true,
                });
            }
            else {
                console.log('Errr')
                this.setState({
                    errorMessage: JSON.stringify(result.errors),
                })
            }
        }

        );
    }


    render() {

        const SignupSchema = Yup.object().shape({
            firstName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!'),
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
                            onChange={(event) => this.setState(prevState => {
                                let newUser = { ...prevState.newUser };
                                newUser.firstName = event.target.value;
                                return { newUser };
                            })} />
                        <ErrorMessage name="firstName" component="div" className='errorMessage' />

                        <label htmlFor="last-name"><b>Last Name</b></label>
                        <Field name="lastName" type="text" placeholder="Last Name"
                            onChange={(event) => this.setState(prevState => {
                                let newUser = { ...prevState.newUser };
                                newUser.lastName = event.target.value;
                                return { newUser };
                            })} />
                        <ErrorMessage name="lastName" component="div" className='errorMessage' />

                        <label htmlFor="email"><b>Email</b></label>
                        <Field name="email" type="email" placeholder="email"
                            onChange={(event) => this.setState(prevState => {
                                let newUser = { ...prevState.newUser };
                                newUser.email = event.target.value;
                                return { newUser };
                            })} />
                        <ErrorMessage name="email" component="div" className='errorMessage' />


                        <label htmlFor="linkedIn"><b>LinkedIn</b></label>
                        <Field type="text" placeholder="LinkedIn"
                            onChange={(event) => this.setState(prevState => {
                                let newUser = { ...prevState.newUser };
                                newUser.linkedIn = event.target.value;
                                return { newUser };
                            })} required />

                        <label htmlFor="password"><b>Password</b></label>
                        <Field name='password' type="password" placeholder="password"
                            onChange={(event) => this.setState(prevState => {
                                let newUser = { ...prevState.newUser };
                                newUser.password = event.target.value;
                                return { newUser };
                            })} />
                        <ErrorMessage name="password" component="div" className='errorMessage' />

                        <label htmlFor="attending-reasons"><b>Attending Reasons</b></label>
                        <Field name='attendingReasons' type="text" placeholder="Ex: 3, 5, 7"
                            onChange={(event) => this.setState(prevState => {
                                let newUser = { ...prevState.newUser };
                                newUser.attendingReasons = event.target.value;
                                return { newUser };
                            })} required />
                        <ErrorMessage name="attendingReasons" component="div" className='errorMessage' />

                        <label htmlFor="preferred-industries"><b>Preferred Industries</b></label>
                        <Field type="text" placeholder="Ex: 1: 13; 3: 1, 5; 5: 2, 10"
                            onChange={(event) => this.setState(prevState => {
                                let newUser = { ...prevState.newUser };
                                newUser.preferredIndustries = event.target.value;
                                return { newUser };
                            })} required />

                        <button type="button" onClick={this.handleRegister}>Register</button>

                        <p className='error'>{this.state.errorMessage}</p>
                    </Form>
                </Formik>

                {
                    this.state.isRegistered &&
                    <Redirect to='/login'></Redirect>
                }


            </div>
        );
    }

}


export default Register;