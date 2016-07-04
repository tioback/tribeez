import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerMiddleware, routerReducer} from 'react-router-redux'
import createLogger from 'redux-logger'
import injectTapEventPlugin from 'react-tap-event-plugin'
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
import Tribe from './pages/Tribe'
import NewTribe from './pages/NewTribe'
import Members from './pages/Members'
import Invite from './pages/Invite'
import Bills from './pages/Bills'
import Bill from './pages/Bill'
import Events from './pages/Events'
import Event from './pages/Event'
import Tasks from './pages/Tasks'
import Task from './pages/Task'
import Notes from './pages/Notes'
import Polls from './pages/Polls'
import Poll from './pages/Poll'
import NotFound from './pages/NotFound'

// react-router routes
import router from './router'
import routes from './routes'

// global injected style:
import './index.css'

// load Roboto from Google Fonts:
import webfont from 'webfontloader'
webfont.load({google: {families: ['Roboto:400,300,500:latin']}})

// redux actions
import {resize, login, logout} from '../common/actions/app'

// app locales (keep list in sync with resources/langs.js and messages/*.js):
import locale_en from 'react-intl/locale-data/en'
import locale_fr from 'react-intl/locale-data/fr'
addLocaleData(locale_en)
addLocaleData(locale_fr)

import {auth} from '../common/firebase'

// redux-form normalizers and plugins
import normalizers from '../common/utils/formNormalizers'
import plugins from '../common/utils/formPlugins'

// redux reducers
import reducers from '../common/reducers'
reducers.routing = routerReducer
reducers.form = formReducer
  .normalize(normalizers)
  .plugin(plugins)

const rootReducer = combineReducers(reducers)

const reduxRouterMiddleware = routerMiddleware(browserHistory)

let store
if (__DEV__) {
  const logger = createLogger({
    errorTransformer: (error) => {
      /*eslint-disable no-console*/
      console.error(error)
      /*eslint-enable no-console*/
      return error
    },
    collapsed: true,
  })
  store = createStore(rootReducer, applyMiddleware(thunk, reduxRouterMiddleware, logger))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk, reduxRouterMiddleware))
}

const history = syncHistoryWithStore(browserHistory, store)

history.listen((location) => {
  ga('send', 'pageview', location.pathname)
})

// update app size
window.onresize = store.dispatch.bind(store.dispatch, resize())
window.onresize()

// Needed for onTouchTap, Can go away when react 1.0 release. See https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user))
    router.resetTo(routes.ACTIVITY, store.dispatch) //TODO: go to initial destination if any
  } else {
    store.dispatch(logout())
    router.resetTo(routes.WELCOME, store.dispatch) //TODO: no redirect if we are on /reset or /join
  }
})

const authenticate = (nextState, replace) => {
  if (!store.getState().user.uid) {
    replace(routes.LOGIN)
  }
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path={routes.WELCOME} component={App}>
        <IndexRoute component={Welcome} />
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.PASSWORD} component={Password} />
        <Route path={routes.RESET} component={Reset} />
        <Route path={routes.REGISTER} component={Register} />
        <Route path={routes.JOIN} component={Join} />
        <Route path={routes.ACTIVITY} component={Activity} onEnter={authenticate} />
        <Route path={routes.PROFILE} component={Profile} onEnter={authenticate} />
        <Route path={routes.TRIBE} component={Tribe} onEnter={authenticate} />
        <Route path={routes.TRIBE_NEW} component={NewTribe} onEnter={authenticate} />
        <Route path={routes.MEMBERS} component={Members} onEnter={authenticate} />
        <Route path={routes.MEMBERS_NEW} component={Invite} onEnter={authenticate} />
        <Route path={routes.BILLS} component={Bills} onEnter={authenticate} />
        <Route path={routes.BILLS_NEW} component={Bill} onEnter={authenticate} />
        <Route path={routes.BILLS_EDIT} component={Bill} onEnter={authenticate} />
        <Route path={routes.EVENTS} component={Events} onEnter={authenticate} />
        <Route path={routes.EVENTS_NEW} component={Event} onEnter={authenticate} />
        <Route path={routes.EVENTS_EDIT} component={Event} onEnter={authenticate} />
        <Route path={routes.TASKS} component={Tasks} onEnter={authenticate} />
        <Route path={routes.TASKS_NEW} component={Task} onEnter={authenticate} />
        <Route path={routes.TASKS_EDIT} component={Task} onEnter={authenticate} />
        <Route path={routes.NOTES} component={Notes} onEnter={authenticate} />
        <Route path={routes.POLLS} component={Polls} onEnter={authenticate} />
        <Route path={routes.POLLS_NEW} component={Poll} onEnter={authenticate} />
        <Route path={routes.POLLS_EDIT} component={Poll} onEnter={authenticate} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))
