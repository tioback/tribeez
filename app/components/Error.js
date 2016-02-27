import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import RaisedButton from 'material-ui/lib/raised-button'

import css from './Error.css'

class Error extends Component {

  render() {
    return (
      <div className={css.container}>
        <div className={css.message}>{'Error: ' + this.props.message}</div>
        <RaisedButton label={this.props.label || 'Retry'} onTouchTap={this.props.retry} containerElement={this.props.containerElement} />
      </div>
    )
  }

}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  retry: PropTypes.func,
  containerElement: PropTypes.node,
}

export default Error