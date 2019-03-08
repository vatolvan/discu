import * as React from 'react'
import * as firebaseui from 'firebaseui'
import * as firebaseLib from 'firebase'

import { FirebaseContext } from '../contexts/FirebaseContext'
import { AuthContext } from '../contexts/AuthContext'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const Auth: React.SFC<Props> = ({ children }): JSX.Element => {
  const [user, setUser] = React.useState<firebase.User | undefined | null>(
    undefined
  )
  const [ui, setUi] = React.useState<firebaseui.auth.AuthUI | null>(null)
  const firebase = React.useContext(FirebaseContext)

  const UILogin = (): void => {
    if (!firebase) {
      console.error('Trying to set login widget before Firebase is initialized')
      return
    }

    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any) => {
          if (authResult.user) {
            setUser(authResult.user)
          }
          return false
        },
      },
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    }

    const uiNew = new firebaseui.auth.AuthUI(firebase.auth())
    uiNew.start('#google-login', uiConfig)
    setUi(uiNew)
  }

  if (firebase && user === null && !ui) {
    UILogin()
  }

  function logOut(): void {
    firebaseLib
      .auth()
      .signOut()
      .then(() => {
        console.log('Kirjauduttu ulos.')
      })
      .catch(error => {
        console.error(error)
      })
  }

  function authChangedHandler(newUser: firebase.User | null): void {
    console.log('Auth state changed, user: ', newUser)
    setUser(newUser)
    if (newUser) {
      // logged in, delete the UI component
      const ui = firebaseui.auth.AuthUI.getInstance()
      if (ui) {
        ui.delete().then(() => setUi(null))
      }
    }
  }

  React.useEffect(() => {
    firebaseLib.auth().onAuthStateChanged(authChangedHandler)
  }, [])

  return (
    <React.Fragment>
      {user && (
        <AuthContext.Provider value={{ user, logOut }}>
          {children}
        </AuthContext.Provider>
      )}
      <div id="google-login" />
    </React.Fragment>
  )
}

export default Auth
