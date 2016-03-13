/*global __DEBUG__:false*/

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistory, routeReducer} from 'react-router-redux'
import createLogger from 'redux-logger'
import injectTapEventPlugin from 'react-tap-event-plugin' // TODO: remove when React is fixed
import {addLocaleData} from 'react-intl'

// react components
import App from './App'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Password from './pages/Password'
import Reset from './pages/Reset'
import Register from './pages/Register'
import Join from './pages/Join'
import Activity from './pages/Activity'
import Profile from './pages/Profile'
import Tribe from './pages/Tribe' //TODO
import NewTribe from './pages/NewTribe'
import Members from './pages/Members'
import NewMember from './pages/NewMember'
import Bills from './pages/Bills'
import NewBill from './pages/NewBill'
import Events from './pages/Events'
import Tasks from './pages/Tasks'
import Notes from './pages/Notes'
import Polls from './pages/Polls'
import NotFound from './pages/NotFound'

// react-router routes
import routes from './constants/routes'

// static assets not being explicitely used in app but still needed in index.html:
import './static'

// global injected style:
import './index.css'

// load Roboto from Google Fonts:
import webfont from 'webfontloader'
webfont.load({google: {families: ['Roboto:400,300,500:latin']}})

// redux actions
import {resize, updateLang} from './actions/app'
import getMember from './actions/getMember'

// navigator lang detector:
import lang from './utils/lang'

// app locales (keep list in sync with resources/langs.js and messages/*.js):
import locale_en from 'react-intl/locale-data/en'
import locale_fr from 'react-intl/locale-data/fr'
addLocaleData(locale_en)
addLocaleData(locale_fr)

// redux-form normalizers and plugins
import normalizers from './utils/formNormalizers'
import plugins from './utils/formPlugins'

// redux reducers
import reducers from './reducers'
reducers.routing = routeReducer
reducers.form = formReducer
  .normalize(normalizers)
  .plugin(plugins)

const rootReducer = combineReducers(reducers)

const reduxRouterMiddleware = syncHistory(browserHistory) // Sync dispatched route actions to the history
let createStoreWithMiddleware
if (__DEBUG__) {
  const logger = createLogger({
    errorTransformer: (error) => {
      Rollbar.error(error)
      return error
    },
  })
  createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware, logger)(createStore)
} else {
  createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware)(createStore)
}

const store = createStoreWithMiddleware(rootReducer)

if (__DEBUG__) {
  reduxRouterMiddleware.listenForReplays(store) // Required for replaying actions from devtools to work
}

// update app lang
store.dispatch(updateLang(lang.getDefault()))

// update app size
window.onresize = store.dispatch.bind(store.dispatch, resize())
window.onresize()

// Needed for onTouchTap, Can go away when react 1.0 release. See https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const authenticate = (nextState, replaceState, callback) => {
  if (!store.getState().member.user.id) {
    const destination = nextState.location.pathname
    if (/^\/(join|reset)/.test(destination)) { // no auth for these routes
      callback()
      return
    }
    let redirectOnLoggedIn
    let redirectOnAnonymous

    if (/^\/($|login|password|register)/.test(destination)) { // public routes
      redirectOnLoggedIn = routes.ACTIVITY
    } else { // private routes
      redirectOnAnonymous = routes.LOGIN
    }
    store.dispatch(getMember(destination, redirectOnLoggedIn, redirectOnAnonymous))
  }
  callback()
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={routes.WELCOME} component={App} onEnter={authenticate}>
        <IndexRoute component={Welcome} />
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.PASSWORD} component={Password} />
        <Route path={routes.RESET} component={Reset} />
        <Route path={routes.REGISTER} component={Register} />
        <Route path={routes.JOIN} component={Join} />
        <Route path={routes.ACTIVITY} component={Activity} />
        <Route path={routes.PROFILE} component={Profile} />
        <Route path={routes.TRIBE} component={Tribe} />
        <Route path={routes.TRIBE_NEW} component={NewTribe} />
        <Route path={routes.MEMBERS} component={Members} />
        <Route path={routes.MEMBERS_NEW} component={NewMember} />
        <Route path={routes.BILLS} component={Bills} />
        <Route path={routes.BILLS_NEW} component={NewBill} />
        <Route path={routes.EVENTS} component={Events} />
        <Route path={routes.TASKS} component={Tasks} />
        <Route path={routes.NOTES} component={Notes} />
        <Route path={routes.POLLS} component={Polls} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))
