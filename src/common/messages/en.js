// base messages: this file is the fallback for other langs

export default {
  // titles
  welcome: 'Welcome',
  register: 'Register',
  join: 'Join',
  login: 'Login',
  password: 'Lost password',
  reset: 'Password update',
  activity: 'Activity',
  profile: 'Profile',
  members: 'Members',
  members_new: 'New member',
  bills: 'Expenses',
  bills_new: 'New expense',
  bills_edit: 'Edit expense',
  events: 'Events',
  events_new: 'New event',
  events_edit: 'Edit event',
  tasks: 'Tasks',
  tasks_new: 'New task',
  tasks_edit: 'Edit task',
  notes: 'Notes',
  notes_new: 'New note',
  polls: 'Polls',
  polls_new: 'New poll',
  polls_edit: 'Edit poll',
  tribe: 'Tribe',
  tribe_new: 'New tribe',

  // subtitles
  messenger_bot: 'Facebook Messenger Bot',
  not_found: 'Page not found',
  title: 'Title',

  // tabs
  'tab.activity': 'WHAT\'S UP',
  'tab.history': 'HISTORY',
  'tab.registered': 'REGISTERED',
  'tab.invited': 'INVITED',
  'tab.upcoming': 'UPCOMING',
  'tab.past': 'PAST',
  'tab.bills': 'LIST',
  'tab.balances': 'BALANCES',

  // dates
  date: 'On {date, date, event}',
  datetime: 'On {date, date, event} at {date, time, short}',
  interval: 'From {start, date, event} to {end, date, event}',
  intervaltime: 'From {start, date, event} at {start, time, short} to {end, date, event} at {end, time, short}',

  // actions
  delete: 'Delete',
  send: 'Send',
  cancel: 'Cancel',
  close: 'Close',
  delete_dialog: 'Do you really want to delete this {type}?',
  vote_again: 'Vote again',
  submit_vote: 'Submit vote',
  return_home: 'Return to Activity',
  retry: 'Retry',

  // Dialogs
  dialog_delete: 'Are you sure you want to delete this?',
  dialog_reinvite: 'Do you want to send an invite again to this address?',
  dialog_update_title: 'Your app is outdated',
  dialog_update_text: 'Please update it to continue using it',
  dialog_reset_title: 'A reset link has been sent to your email address',
  dialog_reset_text: 'Click on that link to reset your password',

  // snack messages
  'snack.password_changed': 'Password changed',
  'snack.profile_updated': 'Profile updated',
  'snack.tribe_created': 'Tribe created',
  'snack.tribe_updated': 'Tribe updated',
  'snack.invite_sent': 'Invite sent',
  'snack.invite_resent': 'Invite sent again',
  'snack.switched': 'Tribe changed',
  'snack.new_bill': '{author, select, _you_ {Expense created} other {{author} created the "{name}" expense}}',
  'snack.update_bill': '{author, select, _you_ {Expense updated} other {{author} updated the "{name}" expense}}',
  'snack.delete_bill': '{author, select, _you_ {Expense deleted} other {{author} deleted the "{name}" expense}}',
  'snack.note_created': 'Note created',
  'snack.note_updated': 'Note saved',
  'snack.notes_reordered': 'Notes reordered',
  'snack.note_deleted': 'Note deleted',
  'snack.new_event': '{author, select, _you_ {Event created} other {{author} created the "{name}" event}}',
  'snack.update_event': '{author, select, _you_ {Event updated} other {{author} updated the "{name}" event}}',
  'snack.delete_event': '{author, select, _you_ {Event deleted} other {{author} deleted the "{name}" event}}',
  'snack.new_poll': '{author, select, _you_ {Poll created} other {{author} created the "{name}" poll}}',
  'snack.update_poll': '{author, select, _you_ {Poll updated} other {{author} updated the "{name}" poll}}',
  'snack.delete_poll': '{author, select, _you_ {Poll deleted} other {{author} deleted the "{name}" poll}}',
  'snack.poll_updated': 'Poll updated',
  'snack.new_task': '{author, select, _you_ {Task created} other {{author} created the "{name}" task}}',
  'snack.update_task': '{author, select, _you_ {Task updated} other {{author} updated the "{name}" task}}',
  'snack.delete_task': '{author, select, _you_ {Task deleted} other {{author} deleted the "{name}" task}}',
  'snack.voted': 'Voted',
  'snack.task_done': 'Task marked as done',
  'snack.logout_success': 'You have been logged out',
  'snack.error': 'Error: please try again',

  // FORMS
  // subtitles:
  password_reset: 'Fill this form to receive a reset link via email',
  password_change: '{name}, please choose a new password',
  invited_you: '{name} invited you',
  login_to_join: '{inviter_name} invited you to join "{tribe_name}"',
  you: 'You',
  your_tribe: 'Your tribe',
  password_lost: 'Lost your password?',
  no_account: 'No account yet?',
  register_now: 'Register now!',
  gravatar: 'To change your profile picture, go to <a href="https://gravatar.com" target="_blank">gravatar.com</a>',
  // register/login/join/profile/tribe:
  'field.login_password': 'Password',
  'error.login_password': 'Wrong password',
  'field.username': 'Your name',
  'error.username': 'Invalid name',
  'field.email': 'Email address',
  'error.email': 'Unknown email address',
  'error.email_empty': 'An email address is required',
  'error.email_invalid': 'Invalid email address',
  'error.email_invalid_suggestion': 'Invalid address. Did you mean {suggestion}?',
  'error.email_exists': 'This email address is already registered',
  'field.password': 'Choose a password',
  'error.password_empty': 'A password is required',
  'error.password_weak': 'Password is too weak',
  'field.password2': 'Password (confirmation)',
  'error.password2': 'Passwords do not match',
  'field.lang': 'Language',
  'error.lang': 'Invalid language',
  'field.birthdate': 'Birthdate',
  'field.phone': 'Phone number',
  'field.new_password': 'Password (leave blank for no change)',
  'error.new_password': 'Invalid password',
  'field.tribe_name': 'Tribe name',
  'error.tribe_name': 'Invalid tribe name',
  'field.city': 'City',
  'error.city': 'Please choose a city in the dropdown suggestions list',
  'field.currency': 'Currency',
  'error.currency': 'Please choose a currency',
  'field.tribe_type': 'Type',
  'error.tribe_type': 'Please choose a tribe type',
  'error.captcha': 'Invalid captcha',
  // common for entities:
  'field.name': 'Name',
  'error.name': 'Invalid name',
  'field.title': 'Title',
  'error.title': 'Invalid title',
  'field.description': 'Description (optional)',
  // bill:
  'field.payer': 'Who paid?',
  'error.payer': 'Please indicate who paid this',
  'field.paid': 'When was it?',
  'error.paid': 'Invalid date',
  'field.amount': 'Total amount',
  'error.amount': 'Invalid amount',
  'field.method': 'Sharing method',
  'method.shares': 'Shares',
  'method.amounts': 'Amounts',
  'error.method': 'Invalid method',
  'error.amount_mismatch': 'The total amount must match the sum of the shares',
  'error.no_parts': 'You must distribute at least one share',
  // poll:
  'field.option': 'Option',
  'field.multiple': 'Allow multiple choices',
  'error.no_options': 'You must give at lease two options',
  // event:
  'field.start': 'Start date',
  'field.time.start': 'Start time (optional)',
  'error.start': 'Invalid date',
  'field.end': 'End date (optional)',
  'field.time.end': 'End time (optional)',
  'field.location': 'Location (optional)',
  'field.url': 'Link (optional)',
  // task:
  'field.wait': 'Waiting period (days)',
  'error.wait': 'Invalid period',
  'field.notice': 'Warning delay (days)',
  'error.notice': 'Invalid delay',
  'field.task_users': 'Concerned members:',
  'error.no_users': 'You must choose at lease one concerned member',
  // submit buttons:
  'submit.register': 'Register & create this tribe',
  'submit.join': 'Register & join this tribe',
  'submit.login': 'Login',
  'submit.password': 'Send',
  'submit.reset': 'Set my password',
  'submit.profile': 'Save profile',
  'submit.invite': 'Send invite',
  'submit.tribe.create': 'Create tribe',
  'submit.tribe.update': 'Update tribe',
  'submit.bill.create': 'Add expense',
  'submit.bill.update': 'Update expense',
  'submit.poll.create': 'Create poll',
  'submit.poll.update': 'Update poll',
  'submit.event.create': 'Add event',
  'submit.event.update': 'Update event',
  'submit.task.create': 'Add task',
  'submit.task.update': 'Update task',
  // leave hook:
  confirm_leave_form: 'The form has been modified. Do you want to leave without finishing?',
  // Comment box:
  comment: 'Your comment...',

  // Members
  'add_member': 'Add a member',
  'member_since': 'Member since {when, date}',
  'invited_by': 'Invited by {user} {when}',

  // Activity
  'entry.member.new': '{author, select, _you_ {You} other {{author}}} joined the tribe!',
  'entry.member.new.infos': 'Invited by {inviter}',
  'entry.bill.new': '{author, select, _you_ {You} other {{author}}} added a expense named "{name}" ({amount, number, money})',
  'entry.bill.new.infos': 'Your share is {amount, number, money}',
  'entry.bill.new.stranger': 'You are not concerned',
  'entry.bill.update': '{author, select, _you_ {You} other {{author}}} modified the "{name}" expense ({amount, number, money})',
  'entry.bill.update.infos': 'Your share is now {amount, number, money}',
  'entry.bill.update.stranger': 'You are not concerned',
  'entry.bill.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" expense ({amount, number, money})',
  'entry.bill.delete.infos': 'Your share was {amount, number, money}',
  'entry.bill.delete.stranger': 'You were not concerned',
  'entry.bill.comment': '{author, select, _you_ {You} other {{author} a}} commented the "{name}" expense:',
  'entry.poll.new': '{author, select, _you_ {You} other {{author}}} added a poll named "{name}"',
  'entry.poll.update': '{author, select, _you_ {You} other {{author}}} modified the "{name}" poll',
  'entry.poll.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" poll',
  'entry.pollcomment': '{author, select, _you_ {You} other {{author}}} commented the "{name}" poll:',
  'entry.event.new': '{author, select, _you_ {You} other {{author}}} added an event named "{name}" starting {when, date}',
  'entry.event.update': '{author, select, _you_ {You} other {{author}}} modified the "{name}" event starting {when, date}',
  'entry.event.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" event starting {when, date}',
  'entry.event.comment': '{author, select, _you_ {You} other {{author}}} commented the "{name}" event:',
  'entry.task.new': '{author, select, _you_ {You} other {{author}}} added a task named "{name}"',
  'entry.task.update': '{author, select, _you_ {You} other {{author}}} modified the "{name}" task',
  'entry.task.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" task',
  'entry.task.comment': '{author, select, _you_ {You} other {{author}}} commented the "{name}" task:',
  'entry.comments': '{num, plural, =0 {No comments} one {# comment} other {# comments}}',
  telegram: 'Using Telegram? Chat with TribeezBot!   ',

  // Bills
  'bill.mypart': 'Your share is {amount, number, money}',
  'bill.nopart': 'You are not concerned',

  // Calendar
  'calendar.allDay': 'All day',
  'calendar.previous': 'Previous',
  'calendar.next': 'Next',
  'calendar.today': 'Today',
  'calendar.month': 'Month',
  'calendar.week': 'Week',
  'calendar.day': 'Day',
  'calendar.agenda': 'Agenda',

  // Tasks
  task_counter: '{user} {count, plural, =0 {never did it} one {did it once} other {did it # times}}',
  last_done: 'Last done {ago}',
  never_done: 'Never done',
  mark_done: 'I just did it',

  // Polls
  poll_answers: '{num, plural, =0 {No answers} one {1 answer} other {# answers}}',

  // Common error handling
  'error.request': 'Request error: please try again later',
  'error.not_found': 'This item does not exist anymore',
}
