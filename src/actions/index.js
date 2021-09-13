export const TYPES = {
    GET_CONTACTS: 'GET_CONTACTS',
    SELECT_CONTACT: 'SELECT_CONTACT',
}

export const getContacts = payload => ({
    type: TYPES.GET_CONTACTS,
    payload: payload,
})

export const selectContact = payload => ({
    type: TYPES.SELECT_CONTACT,
    payload: payload,
})