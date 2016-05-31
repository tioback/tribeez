import React, {Component, PropTypes} from 'react'
import {TextInput, StyleSheet, View} from 'react-native'

import FormattedMessage from './FormattedMessage'

class TextField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    style: PropTypes.object,
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
    const {name, style, touched, error, ...props} = this.props

    const mergedStyle = style ? {...styles.field, ...style} : styles.field

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <TextInput
          ref={this.ref}
          style={mergedStyle}
          {...props}
        />
        <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    //padding: 5,
  },
  label: {
    //
  },
  field: {
    paddingTop: 0,
  },
  error: {
    color: '#F44336',
  },
})

export default TextField
