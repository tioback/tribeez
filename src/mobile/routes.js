import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Join from './pages/Join'
import Profile from './pages/Profile'
import Tribe from './pages/Tribe'
import NewTribe from './pages/NewTribe'
import Activity from './pages/Activity'
import Members from './pages/Members'
import Invite from './pages/Invite'
import Bills from './pages/Bills'
import Bill from './pages/Bill'
import BillDetails from './pages/BillDetails'
import Events from './pages/Events'
import Event from './pages/Event'
import EventDetails from './pages/EventDetails'
import Notes from './pages/Notes'

export default {
  WELCOME: {name: 'welcome', component: Welcome},
  LOGIN: {name: 'login', component: Login},
  REGISTER: {name: 'register', component: Register},
  JOIN: {name: 'join', component: Join},
  PROFILE: {name: 'profile', component: Profile},
  TRIBE: {name: 'tribe', component: Tribe},
  TRIBE_NEW: {name: 'tribe', component: NewTribe},
  ACTIVITY: {name: 'activity', component: Activity},
  MEMBERS: {name: 'members', component: Members},
  MEMBERS_NEW: {name: 'members_new', component: Invite},
  BILLS: {name: 'bills', component: Bills},
  BILL: {name: 'bill', component: BillDetails},
  BILLS_NEW: {name: 'bills_new', component: Bill},
  BILLS_EDIT: {name: 'bills_edit', component: Bill},
  EVENTS: {name: 'events', component: Events},
  EVENT: {name: 'event', component: EventDetails},
  EVENTS_NEW: {name: 'events_new', component: Event},
  EVENTS_EDIT: {name: 'events_edit', component: Event},
  NOTES: {name: 'notes', component: Notes},
}
