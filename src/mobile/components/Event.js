import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text} from 'react-native'

import {connect} from 'react-redux'

import ListItem from '../components/ListItem'
import FormattedMessage from './FormattedMessage'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import {getTimestamp} from '../../common/utils/utils'

class Event extends Component {
  static propTypes = {
    // from redux:
    userMap: PropTypes.object.isRequired,
    // from parent:
    event: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const route = routes.EVENT
    route.props = {
      id: this.props.event.id,
    }
    route.title = this.props.event.name
    router.push(route)
  }

  render() {
    const {event, userMap} = this.props

    const author = userMap[event.author]
    if (!author) {
      return null
    }

    const suffix = (typeof event.start === 'string') ? '' : 'time'

    let date
    if (event.end) {
      date = <FormattedMessage id={'interval' + suffix} values={{start: getTimestamp(event.start), end: getTimestamp(event.end)}} />
    } else {
      date = <FormattedMessage id={'date' + suffix} values={{date: getTimestamp(event.start)}} />
    }

    return (
      <ListItem user={author} onPress={this.handlePress}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.subtitle}>{date}</Text>
      </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
})

const styles = StyleSheet.create({
  title: {
    color: colors.primaryText,
  },
  subtitle: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Event)
