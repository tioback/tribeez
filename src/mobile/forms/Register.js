import React, {Component, PropTypes} from 'react'
import {StyleSheet} from 'react-native'

import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import FormattedMessage from '../components/FormattedMessage'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'

import colors from '../../common/constants/colors'

import langs from '../../common/resources/langs'
import currencies from '../../common/resources/currencies'
import {TRIBE_TYPES} from '../../common/constants/product'
const types = TRIBE_TYPES.map((type) => ({name: type, code: type})) //TODO: translate

import validator from '../../common/utils/formValidator'

import submitRegister from '../../common/actions/submitRegister'

class RegisterForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    initialValues: PropTypes.object,
  }

  render() {
    const {fields: {name, email, password, lang, tribe_name, tribe_type, city, currency}, ...props} = this.props

    return (
      <Form name="register" action={submitRegister} {...props}>
        <FormattedMessage id="you" style={styles.subtitle} />
        <TextField ref="name"
          {...name}
          autoCorrect={false}
          name="username"
        />
        <TextField ref="email"
          {...email}
          errorIsObject={true}
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextField ref="password"
          {...password}
          name="new_password"
          secureTextEntry={true}
        />
        <SelectField ref="lang"
          {...lang}
          items={langs}
        />
        <FormattedMessage id="your_tribe" style={styles.subtitle} />
        <TextField
          {...tribe_name}
          autoCorrect={false}
        />
        <SelectField
          {...tribe_type}
          items={types}
        />
        <CityField
          {...city}
        />
        <SelectField
          {...currency}
          items={currencies}
        />
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  subtitle: {
    color: colors.primaryText,
    marginHorizontal: 5,
    marginBottom: 10,
    fontSize: 20,
    //textAlign: 'center',
  },
})

const mapStateToProps = () => ({
  initialValues: {
    city: {},
  },
})

export default reduxForm({
  form: 'register',
  fields: ['name', 'email', 'password', 'lang', 'tribe_name', 'tribe_type', 'city', 'currency'],
  validate: validator.registerMobile,
  touchOnBlur: false,
}, mapStateToProps)(RegisterForm)
