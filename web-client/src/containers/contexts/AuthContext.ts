import { createContext } from 'react'

interface AuthContext {
  user: firebase.User | null
  logOut: () => void
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  logOut: () => {},
})
