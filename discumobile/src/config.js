import Firebase from 'firebase'

const config = {
  // Your firebase config here
}
const app = Firebase.initializeApp(config)

export const db = app.database()
