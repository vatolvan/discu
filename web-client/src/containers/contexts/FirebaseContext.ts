import * as React from 'react'

import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const config = {
  // Your firebase config here
}

export const FirebaseContext = React.createContext<Firebase | null>(null)

class Firebase {
  db: firebase.database.Database // eslint-disable-line
  messages: firebase.database.Reference // eslint-disable-line
  auth: any // eslint-disable-line

  constructor() { // eslint-disable-line
    const app = firebase.initializeApp(config)

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    this.db = app.database() // eslint-disable-line
    this.messages = this.db.ref('messages') // eslint-disable-line
    this.auth = firebase.auth
  }
}

export default Firebase
