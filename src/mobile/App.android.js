import React, {Component, PropTypes} from 'react'
import {DrawerLayoutAndroid, Navigator, BackAndroid, Linking, StyleSheet, View, Text} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {IntlProvider} from 'react-intl'

import './userAgent'
import config from '../common/config'
import io from 'socket.io-client'

import FormattedMessage from './components/FormattedMessage'
import DrawerContent from './components/DrawerContent'
import Snackbar from './components/Snackbar'
import IconButton from './components/IconButton'

import routes from '../common/routes'
import router from '../common/router'
import colors from '../common/constants/colors'
import getMember from '../common/actions/getMember'
import {message} from '../common/actions/app'

class App extends Component {
  static propTypes = {
    getMember: PropTypes.func.isRequired,
    message: PropTypes.func.isRequired,
    uid: PropTypes.number,
    lang: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    currency: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this)
    this.renderNavigation = this.renderNavigation.bind(this)
    this.renderScene = this.renderScene.bind(this)
    this.handleDrawerOpened = this.handleDrawerOpened.bind(this)
    this.handleDrawerClosed = this.handleDrawerClosed.bind(this)

    this.routeMapper = {
      LeftButton: (/*route, navigator, index, navState*/) => {
        return this.props.uid && (
          <IconButton name="menu" color="white" onPress={this.handleOpenDrawer} style={styles.hamburger} />
        )
      },
      Title: (route/*, navigator, index, navState*/) => {
        if (route.item && route.item.name) {
          return <Text style={styles.navTitle}>{route.item.name}</Text>
        } else {
          return <FormattedMessage style={styles.navTitle} id={route.name} />
        }
      },
      RightButton: (/*route, navigator, index, navState*/) => {
        return null // nothing for now
      },
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.drawerOpened) {
        this.drawer.closeDrawer()
        return true
      }
      if (router.getCurrentRoutes().length === 1) {
        return false
      }
      router.pop()
      return true
    })

    Linking.getInitialURL().then((url) => {
      if (url) {
        const join = url.match(/\/join\/(\w+)/)
        if (join) {
          const route = routes.JOIN
          route.item = join[1]
          router.push(route)
          return
        }
      }

      // default action: check for already authenticated user (HttpOnly cookie)
      if (!this.props.uid) {
        this.props.getMember(routes.ACTIVITY, routes.ACTIVITY, routes.WELCOME)
      }
    })
    .catch(() => {
      //TODO: handle this?
    })
  }

  componentWillReceiveProps(props) {
    if (props.uid && !this.socket) { // log in
      this.socket = io(config.api_endpoint, {
        jsonp: false,
        transports: ['websocket'],
      })
      this.socket.on('message', (msg) => {
        this.props.message(msg)
      })
    }
    if (!props.uid && this.socket) { // log out
      this.socket.disconnect(true)
      this.socket = null
    }
  }

  ref(drawer) {
    this.drawer = drawer
  }

  handleOpenDrawer() {
    this.drawer.openDrawer()
  }

  handleDrawerOpened() {
    this.drawerOpened = true
  }

  handleDrawerClosed() {
    this.drawerOpened = false
  }

  renderNavigation() {
    return <DrawerContent drawer={this.drawer} />
  }

  renderScene(route, navigator) {
    router.update(route, navigator)
    return (
      <View style={styles.page}>
        <route.component item={route.item} edit={route.edit} />
      </View>
    )
  }

  render() {
    const navigationBar = (
      <Navigator.NavigationBar
        routeMapper={this.routeMapper}
        style={styles.navBar}
      />
    )

    const formats = {
      number: {
        money: {
          style: 'currency',
          currency: this.props.currency,
        },
      },
    }

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages} formats={formats}>
        <DrawerLayoutAndroid
          renderNavigationView={this.renderNavigation}
          statusBarBackgroundColor={colors.main}
          ref={this.ref}
          onDrawerOpen={this.handleDrawerOpened}
          onDrawerClose={this.handleDrawerClosed}
          drawerWidth={250}
        >
          <Navigator
            initialRoute={routes.WELCOME}
            renderScene={this.renderScene}
            navigationBar={navigationBar}
          />
          <Snackbar />
        </DrawerLayoutAndroid>
      </IntlProvider>
    )
  }
}

const styles = StyleSheet.create({
  hamburger: {
    padding: 15,
  },
  navBar: {
    backgroundColor: colors.main,
  },
  navTitle: {
    color: 'white',
    marginVertical: 15,
    fontWeight: '500',
    fontSize: 16,
  },
  page: {
    marginTop: 56,
    flex: 1,
    backgroundColor: colors.background,
  },
})

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  lang: state.app.lang, // here is the app language
  messages: state.app.messages,
  currency: state.member.tribe.currency,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMember,
  message,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
