import React from 'react';
import { Redirect } from 'react-router';
import { register } from './service/apiCalls';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this)
        this.state = {
            isRegistered: false,
            errorMessage: null,
        }
    }

    componentDidMount() {
        document.getElementById('content').style.backgroundColor = 'rgba(0,0,0,0)';
    }


    handleRegister() {
        let fn = document.getElementById('rfirst-name').value;
        let ln = document.getElementById('rlast-name').value;
        let li = document.getElementById('rlinkedIn').value;
        let email = document.getElementById('remail').value;
        let pass = document.getElementById('rpassword').value;
        let ar = document.getElementById('rattending-reasons').value;
        ar = ar.split(",");
        let pi = document.getElementById('rpreferred-industries').value;
        const pr_ind = {};
        pi = pi.split(';')
        pi.forEach(ind => {
            let i = ind.split(':')
            let t = i[1].split(',')
            const ts = [];
            t.forEach(topic => {
                ts.push(parseInt(topic))
            })
            pr_ind[i[0]] = ts;

        })
        const requestData = {
            last_name: ln,
            first_name: fn,
            email: email,
            linkedin: false,
            password: pass,
            attending_reasons: ar,
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

        return (
            <div className='Home'>
                <form id='register-form'>
                    <h1>Register</h1>
                    <label htmlFor="rfirst-name"><b>First Name*</b></label>
                    <input type="text" placeholder="First Name" id="rfirst-name" required />

                    <label htmlFor="rlast-name"><b>Last Name*</b></label>
                    <input type="text" placeholder="Last Name" id="rlast-name" required />

                    <label htmlFor="remail"><b>Email*</b></label>
                    <input type="email" placeholder="email" id="remail" required />


                    <label htmlFor="rlinkedIn"><b>LinkedIn*</b></label>
                    <input type="text" placeholder="LinkedIn" id="rlinkedIn" required />

                    <label htmlFor="rpassword"><b>Password*</b></label>
                    <input type="password" placeholder="password" id="rpassword" required />

                    <label htmlFor="rattending-reasons"><b>Attending Reasons*</b></label>
                    <input type="text" placeholder="Ex: 3, 5, 7" id="rattending-reasons" required />

                    <label htmlFor="rpreferred-industries"><b>Preferred Industries*</b></label>
                    <input type="text" placeholder="Ex: 1: 13; 3: 1, 5; 5: 2, 10" id="rpreferred-industries" required />

                    <button type="button" onClick={this.handleRegister}>Register</button>

                    <p class='error'>{this.state.errorMessage}</p>
                </form>
                {
                    this.state.isRegistered &&
                    <Redirect to='/login'></Redirect>
                }


            </div>
        );
    }

}


export default Register;