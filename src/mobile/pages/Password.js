import React, {Component, PropTypes} from 'react'
import {KeyboardAvoidingView, Alert, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import routes from '../../common/routes'
import router from '../../common/router'

import PasswordForm from '../forms/Password'

class Password extends Component {
  static propTypes = {
    // from redux:
    messages: PropTypes.object.isRequired,
    sent: PropTypes.bool.isRequired,
  }

  componentWillReceiveProps(props) {
    if (props.sent) {
      Alert.alert(props.messages.dialog_reset_title, props.messages.dialog_reset_text, [
        {text: 'OK', onPress: this.handleClose},
      ])
    }
  }

  handleClose() {
    router.resetTo(routes.WELCOME)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <PasswordForm />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  messages: state.app.messages, //TODO
  sent: state.password.sent,
})

export default connect(mapStateToProps)(Password)
