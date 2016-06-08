import React, {Component, PropTypes} from 'react'
import {StyleSheet} from 'react-native'

import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import FormattedMessage from '../components/FormattedMessage'

import validator from '../../common/utils/formValidator'

import submitLogin from '../../common/actions/submitLogin'

class LoginForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    destination: PropTypes.object, // next route after login (when trying to directly access a page when anonymous)
    invite: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNext() {
    this.refs.password.focus()
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitLogin.bind(null, this.props.destination))(event) //TODO: prevent duplicate code
  }

  render() {
    const {fields: {email, password}, invite, ...props} = this.props

    const subtitle = invite.email && (
      <FormattedMessage id="login_to_join" values={invite} style={styles.subtitle} />
    )

    return (
      <Form name="login" action={submitLogin.bind(null, this.props.destination)} {...props}>
        {subtitle}
        <TextField ref="email"
          {...email}
          autoFocus={true}
          autoCorrect={false}
          keyboardType="email-address"
          onSubmitEditing={this.handleNext}
        />
        <TextField ref="password"
          {...password}
          name="login_password"
          secureTextEntry={true}
          onSubmitEditing={this.handleSubmit}
        />
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: 50,
    textAlign: 'center',
  },
})

const mapStateToProps = (state) => ({
  destination: state.login.destination,
  invite: state.join.data,
  initialValues: {
    email: state.join.data.email, // email is null when not coming from /join
    invite_token: state.join.data.token,
  },
})

export default reduxForm({
  form: 'login',
  fields: ['email', 'password', 'invite_token'],
  validate: validator.login,
  touchOnBlur: false,
}, mapStateToProps)(LoginForm)
