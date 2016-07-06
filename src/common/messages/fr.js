import en from './en'

const fr = {
  // titles
  welcome: 'Bienvenue',
  register: 'Inscription',
  join: 'Rejoindre',
  login: 'Connexion',
  password: 'Mot de passe perdu',
  reset: 'Nouveau mot de passe',
  activity: 'Activité',
  profile: 'Profil',
  members: 'Membres',
  members_new: 'Nouveau membre',
  bills: 'Dépenses',
  bills_new: 'Nouvelle dépense',
  bills_edit: 'Modifier la dépense',
  events: 'Évènements',
  events_new: 'Nouvel évènement',
  events_edit: 'Modifier l’évènement',
  tasks: 'Tâches',
  tasks_new: 'Nouvelle tâche',
  tasks_edit: 'Modifier la tâche',
  notes: 'Notes',
  notes_new: 'Nouvelle note',
  polls: 'Sondages',
  polls_new: 'Nouveau sondage',
  polls_edit: 'Modifier le sondage',
  tribe: 'Tribu',
  tribe_new: 'Nouvelle tribu',

  // subtitles
  messenger_bot: 'Robot pour Facebook Messenger',
  not_found: 'Page introuvable',
  title: 'Titre',

  // tabs
  'tab.activity': 'QUOI DE NEUF',
  'tab.history': 'HISTORIQUE',
  'tab.registered': 'INSCRITS',
  'tab.invited': 'INVITÉS',
  'tab.upcoming': 'A VENIR',
  'tab.past': 'PASSÉS',
  'tab.bills': 'LISTE',
  'tab.balances': 'BALANCES',

  // dates
  date: 'Le {date, date, event}',
  datetime: 'Le {date, date, event} à {date, time, short}',
  interval: 'Du {start, date, event} au {end, date, event}',
  intervaltime: 'Du {start, date, event} à {start, time, short} au {end, date, event} à {end, time, short}',

  // actions
  delete: 'Supprimer',
  send: 'Envoyer',
  cancel: 'Annuler',
  close: 'Fermer',
  delete_dialog: 'Voulez-vous vraiment supprimer {type, select, bill {cette dépense} event {cet évènement} note {cette note} poll {ce sondage} task {cette tâche}} ?',
  vote_again: 'Re-voter',
  submit_vote: 'Voter',
  return_home: 'Revenir à l’Activité',
  retry: 'Réessayer',

  // Dialogs
  dialog_delete: 'Voulez-vous vraiment supprimer ceci ?',
  dialog_reinvite: 'Renvoyer une invitation à cette adresse?',
  dialog_update_title: 'Your app is outdated',
  dialog_update_text: 'Please update it to continue using it',
  dialog_reset_title: 'Un lien de réinitialisation a été envoyé à votre adresse e-mail',
  dialog_reset_text: 'Cliquez dessus pour choisir un nouveau mot de passe',

  // snack messages
  'snack.password_changed': 'Mot de passe modifié',
  'snack.profile_updated': 'Profil modifié',
  'snack.tribe_created': 'Tribu créée',
  'snack.tribe_updated': 'Tribu modifiée',
  'snack.invite_sent': 'Invitation envoyée',
  'snack.invite_resent': 'Invitation renvoyée',
  'snack.switched': 'Tribu changée',
  'snack.NEW_BILL': '{author, select, _you_ {Dépense ajoutée} other {{author} a ajouté la dépense "{name}"}}',
  'snack.UPDATE_BILL': '{author, select, _you_ {Dépense modifiée} other {{author} a modifié la dépense "{name}"}}',
  'snack.DELETE_BILL': '{author, select, _you_ {Dépense supprimée} other {{author} a supprimé la dépense "{name}"}}',
  'snack.note_created': 'Note créée',
  'snack.note_updated': 'Note sauvegardée',
  'snack.notes_reordered': 'Notes réordonnées',
  'snack.note_deleted': 'Note supprimée',
  'snack.NEW_EVENT': '{author, select, _you_ {Évènement ajouté} other {{author} a ajouté l’évènement "{name}"}}',
  'snack.UPDATE_EVENT': '{author, select, _you_ {Évènement modifié} other {{author} a modifié l’évènement "{name}"}}',
  'snack.DELETE_EVENT': '{author, select, _you_ {Évènement supprimé} other {{author} a supprimé l’évènement "{name}"}}',
  'snack.NEW_POLL': '{author, select, _you_ {Sondage ajouté} other {{author} a ajouté le sondage "{name}"}}',
  'snack.UPDATE_POLL': '{author, select, _you_ {Sondage modifié} other {{author} a modifié le sondage "{name}"}}',
  'snack.DELETE_POLL': '{author, select, _you_ {Sondage supprimé} other {{author} a supprimé le sondage "{name}"}}',
  'snack.poll_updated': 'Sondage modifié', // after on/off switch
  'snack.NEW_TASK': '{author, select, _you_ {Tâche ajoutée} other {{author} a ajouté la tâche "{name}"}}',
  'snack.UPDATE_TASK': '{author, select, _you_ {Tâche modifiée} other {{author} a modifié la tâche "{name}"}}',
  'snack.DELETE_TASK': '{author, select, _you_ {Tâche supprimée} other {{author} a supprimé la tâche "{name}"}}',
  'snack.voted': 'Voté',
  'snack.task_done': 'Tâche marquée comme effectuée',
  'snack.logout_success': 'Vous êtes déconnecté',
  'snack.error': 'Erreur: veuillez rééssayer',

  // FORMS
  // subtitles:
  password_reset: 'Renplissez ce formulaire pour recevoir un lien de réinitialisation de mot de passe par e-mail',
  password_change: '{name}, choisissez votre nouveau mot de passe',
  invited_you: '{name} vous a invité',
  login_to_join: '{inviter} vous a invité à rejoindre la tribu "{tribe_name}"',
  you: 'Vous',
  your_tribe: 'Votre tribu',
  password_lost: 'Mot de passe perdu ?',
  no_account: 'Pas encore de compte ?',
  register_now: 'Inscrivez-vous !',
  gravatar: 'Pour modifier votre photo de profil, allez sur <a href="https://gravatar.com" target="_blank">gravatar.com</a>',
  // register/login/join/profile/tribe:
  'field.login_password': 'Mot de passe',
  'error.login_password': 'Mot de passe invalide',
  'field.username': 'Votre prénom',
  'error.username': 'Prénom incorrect',
  'field.email': 'Adresse e-mail',
  'error.email': 'Adresse e-mail inconnue',
  'error.email_empty': 'Une adresse e-mail est requise',
  'error.email_invalid': 'Adresse e-mail incorrecte',
  'error.email_invalid_suggestion': 'Adresse incorrecte. Vouliez-vous écrire {suggestion} ?',
  'error.email_exists': 'Cette adresse e-mail est déjà enregistrée',
  'field.password': 'Choisissez un mot de passe',
  'error.password_empty': 'Un mot de passe est requis',
  'error.password_weak': 'Mot de passe trop faible',
  'field.password2': 'Mot de passe (confirmation)',
  'error.password2': 'Les mots de passe ne correspondent pas',
  'field.lang': 'Langue',
  'error.lang': 'Langue incorrecte',
  'field.birthdate': 'Date de naissance',
  'field.phone': 'Numéro de téléphone',
  'field.new_password': 'Mot de passe (laissez vide pour ne pas changer)',
  'error.new_password': 'Mot de passe incorrect',
  'field.tribe_name': 'Nom de la tribu',
  'error.tribe_name': 'Nom incorrect',
  'field.city': 'Ville',
  'error.city': 'Veuillez choisir une ville dans la liste de suggestions',
  'field.currency': 'Devise',
  'error.currency': 'Devise incorrecte',
  'field.tribe_type': 'Type',
  'error.tribe_type': 'Type incorrect',
  'error.captcha': 'Captcha invalide',
  // common for entities:
  'field.name': 'Nom',
  'error.name': 'Nom incorrect',
  'field.title': 'Titre',
  'error.title': 'Titre incorrect',
  'field.description': 'Description (facultative)',
  // bill:
  'field.payer': 'Qui a payé ?',
  'error.payer': 'Veuillez indiquer la personne qui a payé',
  'field.paid': 'Date de paiement',
  'error.paid': 'date incorrecte',
  'field.amount': 'Montant total',
  'error.amount': 'Montant incorrect',
  'field.method': 'Méthode de partage',
  'method.shares': 'Parts',
  'method.amounts': 'Montants',
  'error.method': 'Méthode incorrecte',
  'error.amount_mismatch': 'Le montant de la dépense doit correspondre à la somme des parts',
  'error.no_parts': 'Vous devez distribuer au moins une part',
  // poll:
  'field.option': 'Choix',
  'field.multiple': 'Choix multiples',
  'error.no_options': 'Vous devez donner au moins deux choix',
  // event:
  'field.start': 'Date de début',
  'field.time.start': 'Heure de début (facultative)',
  'error.start': 'Date incorrecte',
  'field.end': 'Date de fin (facultative)',
  'field.time.end': 'Heure de fin (facultative)',
  'field.location': 'Lieu (facultatif)',
  'field.url': 'Lien (facultatif)',
  // task:
  'field.wait': 'Période de carence (jours)',
  'error.wait': 'Période incorrecte',
  'field.notice': 'Délai d’application (jours)',
  'error.notice': 'Délai incorrect',
  'field.task_users': 'Membres concernés :',
  'error.no_users': 'Vous devez choisir au moins un membre concerné',
  // submit buttons:
  'submit.register': 'S’inscrire et créer cette tribu',
  'submit.join': 'S’inscrire et rejoindre cette tribu',
  'submit.login': 'Connexion',
  'submit.password': 'Envoyer',
  'submit.reset': 'Enregistrer',
  'submit.profile': 'Enregistrer',
  'submit.invite': 'Envoyer l’invitation',
  'submit.tribe.create': 'Créer la tribu',
  'submit.tribe.update': 'Modifier la tribu',
  'submit.bill.create': 'Ajouter la dépense',
  'submit.bill.update': 'Modifier la dépense',
  'submit.poll.create': 'Créer le sondage',
  'submit.poll.update': 'Modifier le sondage',
  'submit.event.create': 'Ajouter l’évènement',
  'submit.event.update': 'Modifier l’évènement',
  'submit.task.create': 'Ajouter la tâche',
  'submit.task.update': 'Modifier la tâche',
  // leave hook:
  confirm_leave_form: 'Le formulaire a été modifié : voulez-vous vraiment abandonner vos entrées ?',
  // Comment box:
  comment: 'Votre commentaire...',

  // Members
  'add_member': 'Ajouter un membre',
  'member_since': 'Membre depuis le {when, date}',
  'invited_by': 'Invité par {user} {when}',

  // Activity
  'entry.member.new': '{author, select, _you_ {Vous avez} other {{author} a}} rejoint la tribu !',
  'entry.member.new.infos': 'Invité-e par {inviter}',
  'entry.bill.new': '{author, select, _you_ {Vous avez} other {{author} a}} ajouté une dépense nommée "{name}" ({amount, number, money})',
  'entry.bill.new.infos': 'Votre part est de {amount, number, money}',
  'entry.bill.new.stranger': 'Vous n’êtes pas concerné-e',
  'entry.bill.update': '{author, select, _you_ {Vous avez} other {{author} a}} modifié la dépense "{name}" ({amount, number, money})',
  'entry.bill.update.infos': 'Votre part est maintenant de {amount, number, money}',
  'entry.bill.update.stranger': 'Vous n’êtes pas concerné-e',
  'entry.bill.delete': '{author, select, _you_ {Vous avez} other {{author} a}} supprimé la dépense "{name}" ({amount, number, money})',
  'entry.bill.delete.infos': 'Votre part était de {amount, number, money}',
  'entry.bill.delete.stranger': 'Vous n’étiez pas concerné-e',
  'entry.bill.comment': '{author, select, _you_ {Vous avez} other {{author} a}} commenté la dépense "{name}" :',
  'entry.poll.new': '{author, select, _you_ {Vous avez} other {{author} a}} ajouté un sondage nommé "{name}"',
  'entry.poll.update': '{author, select, _you_ {Vous avez} other {{author} a}} modifié le sondage "{name}"',
  'entry.poll.delete': '{author, select, _you_ {Vous avez} other {{author} a}} supprimé le sondage "{name}"',
  'entry.poll.comment': '{author, select, _you_ {Vous avez} other {{author} a}} commenté le sondage "{name}" :',
  'entry.event.new': '{author, select, _you_ {Vous avez} other {{author} a}} ajouté un évènement nommé "{name}" pour le {when, date}',
  'entry.event.update': '{author, select, _you_ {Vous avez} other {{author} a}} modifié l’évènement "{name}" du {when, date}',
  'entry.event.delete': '{author, select, _you_ {Vous avez} other {{author} a}} supprimé l’évènement "{name}" du {when, date}',
  'entry.event.comment': '{author, select, _you_ {Vous avez} other {{author} a}} commenté l’évènement "{name}" :',
  'entry.task.new': '{author, select, _you_ {Vous avez} other {{author} a}} ajouté une tâche nommé "{name}"',
  'entry.task.update': '{author, select, _you_ {Vous avez} other {{author} a}} modifié la tâche "{name}"',
  'entry.task.delete': '{author, select, _you_ {Vous avez} other {{author} a}} supprimé la tâche "{name}"',
  'entry.task.comment': '{author, select, _you_ {Vous avez} other {{author} a}} commenté la tâche "{name}" :',
  'entry.comments': '{num, plural, =0 {Aucun commentaire} one {# commentaire} other {# commentaires}}',
  telegram: 'Vous utilisez Telegram ? Discutez avec le TribeezBot !   ',

  // Bills
  'bill.mypart': 'Votre part est de {amount, number, money}',
  'bill.nopart': 'Vous n’êtes pas concerné-e',

  // Calendar
  'calendar.allDay': 'Journée',
  'calendar.previous': 'Prédécent',
  'calendar.next': 'Suivant',
  'calendar.today': 'Aujourd’hui',
  'calendar.month': 'Mois',
  'calendar.week': 'Semaine',
  'calendar.day': 'Jour',
  'calendar.agenda': 'Agenda',

  // Tasks
  task_counter: '{user} {count, plural, =0 {ne l’a jamais fait} other {l’a fait # fois}}',
  last_done: 'Dernière fois {ago}',
  never_done: 'Jamais effectuée',
  mark_done: 'Je viens de le faire',

  // Polls
  poll_answers: '{num, plural, =0 {Aucune réponse} one {1 réponse} other {# réponses}}',

  // Common error handling
  'error.request': 'Erreur: veuillez rééssayer plus tard',
  'error.not_found': 'Cet élément n’existe plus',
}

export default {...en, ...fr} // to have English as a fallback //TODO: avoid
