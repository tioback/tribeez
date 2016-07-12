import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const now = Date.now() // need to be called only once, otherwise form reinitializes indefinitely

const mapStateToProps = (state, ownProps) => {
  const bill = ownProps.current || state.bills.current // either from routing state, or from ajax retrieval
  let initialValues
  if (bill) {
    const parts = state.tribe.users
      .map((user) => ({uid: user.uid, amount: bill.parts[user.uid] || ''}))
      .sort((a, b) => (a.amount > b.amount ? -1 : 1))

    initialValues = {
      id: bill.id,
      name: bill.name,
      payer: bill.payer,
      paid: bill.paid,
      amount: bill.amount,
      method: 'amounts',
      description: bill.description || '',
      parts,
    }
  } else {
    initialValues = {
      payer: state.user.uid,
      paid: now,
      method: 'shares',
      parts: state.tribe.users.map((user) => ({uid: user.uid, amount: 1})),
    }
  }
  return {
    users: state.tribe.users,
    userMap: state.tribe.userMap,
    currency: state.tribe.currency, //TODO: be able to remove
    initialValues,
    bill,
    tid: state.tribe.id,
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return reduxForm({
    form: 'bill',
    fields: ['id', 'name', 'payer', 'paid', 'amount', 'method', 'description', 'parts[].uid', 'parts[].amount'],
    validate: validator(['name', 'payer', 'amount', 'paid', 'method', 'parts'], ['description']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
