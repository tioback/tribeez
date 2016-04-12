import React from 'react'
const PropTypes = React.PropTypes
import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'

import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'

import TextField from './fields/Text'
import MoneyField from './fields/Money'
import SelectField from './fields/Select'
import DatePicker from './fields/Date'
import Part from './deep/Part'

import styles from '../constants/styles'

import validator, {focus} from '../utils/formValidator'

import getBill from '../actions/getBill'
import submitBill from '../actions/submitBill'

const today = new Date()

class BillForm extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMethodChange = this.handleMethodChange.bind(this)
  }

  componentWillMount() {
    if (!this.props.bill && this.props.id) {
      this.props.getBill(this.props.id)
    }
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitBill)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  handleMethodChange(value) {
    if (value === this.props.fields.method.value) {
      return // no change => no reset
    }
    if (value === 'shares') {
      this.props.fields.parts.forEach((part) => {
        part.amount.onChange(1)
      })
    } else {
      this.props.fields.parts.forEach((part) => {
        part.amount.onChange('')
      })
    }
    this.props.fields.method.onChange(value)
  }

  render() {
    const {fields: {name, description, payer, paid, amount, method, parts}, error, submitting, users, currency} = this.props

    const userItems = users.map((user) =>
      <MenuItem value={user.id} key={user.id} primaryText={user.name} />
    )

    return (
      <form onSubmit={this.handleSubmit}>
        <CardText>
          <TextField ref="name"
            required={true}
            floatingLabelText="Title"
            errorText={name.touched && name.error && <FormattedMessage id="error.name" />}
            {...name}
          />
          <TextField ref="description"
            multiLine={true}
            floatingLabelText="Description (optional)"
            errorText={description.touched && description.error && <FormattedMessage id="error.description" />}
            {...description}
          />
          <SelectField ref="payer"
            floatingLabelText="Who paid?"
            errorText={payer.touched && payer.error && <FormattedMessage id="error.payer" />}
            {...payer}
          >
            {userItems}
          </SelectField>
          <DatePicker ref="paid"
            required={true}
            locale={this.props.lang}
            maxDate={today}
            floatingLabelText="When was it?"
            errorText={paid.touched && paid.error && <FormattedMessage id="error.paid" />}
            {...paid}
          />
          <MoneyField ref="amount"
            floatingLabelText="Total amount"
            errorText={amount.touched && amount.error && <FormattedMessage id="error.amount" />}
            currency={currency}
            {...amount}
          />
          <SelectField ref="method"
            floatingLabelText="Sharing method"
            errorText={method.touched && method.error && <FormattedMessage id="error.method" />}
            {...method}
            onChange={this.handleMethodChange}
          >
            <MenuItem value="shares" primaryText="Shares" />
            <MenuItem value="amounts" primaryText="Amounts" />
            {/* TODO: add items named "Category: _____" */}
          </SelectField>
          {
            parts.map((part, index) =>
              <Part key={index}
                method={method.value}
                amount={part.amount}
                currency={currency}
                user={users.find((u) => (u.id === part.user_id.value))}
              />
            )
          }
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={this.props.bill ? 'Update bill' : 'Add bill'} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id={'error.' + error} />}
          </p>
        </CardActions>
      </form>
    )
  }
}

BillForm.propTypes = {
  // from parent component:
  id: PropTypes.number,
  current: PropTypes.object,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux state:
  users: PropTypes.array,
  currency: PropTypes.string,
  lang: PropTypes.string,
  initialValues: PropTypes.object,
  bill: PropTypes.object,
  // action creators:
  getBill: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const bill = ownProps.current || state.bills.current // either from routing state, or from ajax retrieval
  let initialValues
  if (bill) {
    initialValues = {
      id: bill.id,
      name: bill.name,
      payer: bill.payer_id,
      paid: bill.paid,
      amount: bill.amount,
      method: 'amounts',
      description: bill.description,
      parts: bill.parts,
    }
  } else {
    initialValues = {
      payer: state.member.user.id,
      paid: today.getTime(),
      method: 'shares',
      parts: state.member.tribe.users.map((user) => ({user_id: user.id, amount: 1})),
    }
  }
  return {
    users: state.member.tribe.users,
    currency: state.member.tribe.currency,
    lang: state.app.lang,
    initialValues,
    bill,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBill,
}, dispatch)

export default reduxForm({
  form: 'bill',
  fields: ['id', 'name', 'payer', 'paid', 'amount', 'method', 'description', 'parts[].user_id', 'parts[].amount'],
  returnRejectedSubmitPromise: true,
  validate: validator.bill,
}, mapStateToProps, mapDispatchToProps)(BillForm)
