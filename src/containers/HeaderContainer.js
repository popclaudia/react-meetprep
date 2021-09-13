import { connect } from 'react-redux'

import * as ContactsActions from '../actions'
import { bindActionCreators } from 'redux'
import Header from '../components/Header'

const mapStateToProps = (state) => ({
    contacts: state.contacts,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ContactsActions, dispatch)
})

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)


export default HeaderContainer;