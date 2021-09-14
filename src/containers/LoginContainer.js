import { connect } from 'react-redux'
import Login from '../components/Login'
import { logInUser } from '../thunk/thunkFunction'


const mapDispatchToProps = dispatch => {
    return {
        logIn: (email, password, callback) => {
            dispatch(logInUser(email, password, callback));
        }
    }
}

const LogInContainer = connect(
    null,
    mapDispatchToProps
)(Login)


export default LogInContainer;