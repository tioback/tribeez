import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import TextField from 'material-ui/TextField'
import * as colors from 'material-ui/styles/colors'

import styles from '../../styles'

class MoneyFieldWrapper extends Component {
  static propTypes = {
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    name: PropTypes.string,
    currency: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.focus()
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <TextField
          ref={this.ref}
          style={styles.field}
          inputStyle={{width: 'calc(100% - 50px)'}}
          type="number"
          step="0.01"
          min="0"
          max="99999999"
          floatingLabelText={<FormattedMessage id={'field.' + this.props.name} />}
          errorText={this.props.touched && this.props.error && <FormattedMessage id={'error.' + this.props.name} />}
          {...this.props}
        />
        <div style={{position: 'absolute', top: 40, right: 4, color: colors.grey300}}>
          {this.props.currency}
        </div>
      </div>
    )
  }
}

export default MoneyFieldWrapper
