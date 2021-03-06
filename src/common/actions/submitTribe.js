import {SubmissionError} from 'redux-form'

import {auth, db, timestamp} from '../firebase'

import {SNACK_MESSAGE} from '../constants/actions'

import router from '../router'
import routes from '../routes'

import failure from './failure'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const uid = auth.currentUser.uid

    // EDIT CURRENT TRIBE:
    if (values.id) {
      const tid = values.id
      let current_city
      db.ref('tribes/' + tid + '/infos').transaction((infos) => {
        if (infos) {
          current_city = infos.city.place_id
          infos.name = values.tribe_name
          infos.type = values.tribe_type
          infos.currency = values.currency
          infos.city = values.city
        }
        return infos
      })
      .then(() => {
        // remove from current city
        return db.ref('cities/' + current_city + '/tribes/' + tid).remove()
      })
      .then(() => {
        auth.currentUser.tribe = values.tribe_name
        // add to new city
        return db.ref('cities/' + values.city.place_id).transaction((city) => {
          if (!city) {
            city = {...values.city, place_id: null} // place_id is already the key
          }
          if (!city.tribes) {
            city.tribes = {}
          }
          city.tribes[tid] = true
          return city
        })
      })
      .then(() => {
        return db.ref('tribes/' + tid + '/members').once('value')
      })
      .then((snapshot) => {
        const members = snapshot.val()
        const promises = []
        for (const id in members) {
          promises.push(db.ref('users/' + id + '/tribes/' + tid).set(values.tribe_name))
        }
        return Promise.all(promises)
      })
      .then(() => {
        resolve()
        dispatch({
          type: SNACK_MESSAGE,
          message: 'tribe_updated',
        })
      })
      .catch((error) => {
        reject(new SubmissionError({_error: 'request'}))
        dispatch(failure(error, 'submitTribe/edit'))
      })

    // CREATE NEW TRIBE:
    } else {
      const tid = db.ref('tribes').push().key
      const historyKey = db.ref('tribes/' + tid + '/history').push().key

      db.ref('tribes/' + tid).set({
        infos: {
          name: values.tribe_name,
          type: values.tribe_type,
          currency: values.currency,
          city: values.city,
          created: timestamp,
        },
        members: {
          [uid]: {
            balance: 0,
            gravatar: auth.currentUser.gravatar,
            name: auth.currentUser.name,
            joined: timestamp,
            last_viewed_history_key: historyKey,
          },
        },
      })
      .then(() => {
        // add to new city
        return db.ref('cities/' + values.city.place_id).transaction((city) => {
          if (!city) {
            city = {...values.city, place_id: null} // place_id is already the key
          }
          if (!city.tribes) {
            city.tribes = {}
          }
          city.tribes[tid] = true
          return city
        })
      })
      .then(() => {
        return db.ref('users/' + uid).transaction((user) => {
          if (user) {
            user.current_tribe = tid
            user.tribes[tid] = values.tribe_name
          }
          return user
        })
      })
      .then(() => {
        // add history entry
        return db.ref('tribes/' + tid + '/history/' + historyKey).set({
          action: 'new',
          type: 'member',
          time: timestamp,
          author: uid,
        })
      })
      .then(() => {
        resolve()
        router.resetTo(routes.ACTIVITY, dispatch)
        dispatch({
          type: SNACK_MESSAGE,
          message: 'tribe_created',
        })
      })
      .catch((error) => {
        reject(new SubmissionError({_error: 'request'}))
        dispatch(failure(error, 'submitTribe/new'))
      })
    }
  })
}
