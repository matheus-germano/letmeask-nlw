import { createContext, ReactNode, useEffect, useState } from 'react'
import { auth, firebase } from '../services/firebase'

// Creating types for the objects
type User = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

// Creating auth context
export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  // creating user state
  const [user, setUser] = useState<User>()

  useEffect(() => {
    // Verify if already exists a user signed
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        // If the user haven't name or photo
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account')
        }

        // setting the user infos in the state
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    // Stop listening events when
    // useEffect finish de user fetch
    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    // Call the google auth provider
    const provider = new firebase.auth.GoogleAuthProvider()

    // To sign in a pop up google login window
    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      // If the user haven't name or photo
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account')
      }

      // setting the user infos in the state
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  
  return(
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}