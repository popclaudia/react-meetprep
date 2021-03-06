export const TYPES = {
    GET_CONTACTS: 'GET_CONTACTS',
    SAVE_CONTACTS: 'SAVE_CONTACTS',
    SELECT_CONTACT: 'SELECT_CONTACT',
    LOGIN: 'LOGIN',
}

export const getContacts = () => ({
    type: TYPES.GET_CONTACTS,
})

export const saveContacts = (payload) => ({
    type: TYPES.SAVE_CONTACTS,
    payload: payload,
})

export const selectContact = payload => ({
    type: TYPES.SELECT_CONTACT,
    payload: payload,
})

export const logInAction = name => ({
    type: TYPES.LOGIN,
    payload: name,
})