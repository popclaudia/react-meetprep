import { TYPES } from "../actions";

const initialState = {
    contacts: [],
    selected_contact: 'none',
    user_name: '',
}

export default function contactsReducer(state = initialState, action) {
    switch (action.type) {
        case TYPES.SAVE_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
            }
        case TYPES.SELECT_CONTACT:
            return {
                ...state,
                selected_contact: action.payload,
            }
        case TYPES.LOGIN:
            return {
                ...state,
                user_name: action.payload,
            }
        default:
            return state
    }
}