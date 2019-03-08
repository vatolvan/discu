import * as React from 'react'

import Firebase, {
  FirebaseContext,
} from '../containers/contexts/FirebaseContext'
import Discu from '../containers/discu/discu'
import Auth from '../containers/auth/Auth'

const App: React.SFC = (): JSX.Element => {
  const firebase = new Firebase()

  return (
    <FirebaseContext.Provider value={firebase}>
      <Auth>
        <Discu />
      </Auth>
    </FirebaseContext.Provider>
  )
}

export default App
