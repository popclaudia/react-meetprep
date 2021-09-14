import { APIRequester2 } from "../service/apiRequester";
import { logInAction } from "../actions";


export function logInUser(email, password, callback) {

    const { logIn } = APIRequester2();
    return function(dispatch) {
        return logIn({ email, password }).then(
            (response) => {
                console.log(response);
                dispatch(logInAction(response.data.user.first_name + ' ' + response.data.user.last_name));
                callback(response);

            }
        )

    };
}