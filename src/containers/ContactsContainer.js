import { connect } from 'react-redux'

import * as ContactsActions from '../actions'
import Contacts from '../components/Contacts'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({
    contacts: state.contacts,
    selectedContact: state.selected_contact
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ContactsActions, dispatch)
})

const VisibleContacts = connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts)


export default VisibleContacts;