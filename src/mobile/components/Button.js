import React, {Component, PropTypes} from 'react'
import {TouchableOpacity, StyleSheet, Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class Button extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    const {intl, id, disabled, onPress, ...props} = this.props
    return (
      <TouchableOpacity onPress={onPress} style={disabled ? styles.disabled : styles.enabled}>
        <Text {...props}>{intl.formatMessage({id})}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  enabled: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    backgroundColor: 'white',
    // Android:
    elevation: 2,
    //iOS:
    // shadowColor: 'red',
    // shadowOffset: {width: 5, height: 5},
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
  },
  disabled: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    backgroundColor: '#f2f2f2',
  },
})

export default injectIntl(Button)
