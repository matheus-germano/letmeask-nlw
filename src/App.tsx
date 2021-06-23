import { createContext, useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom';

import { auth, firebase } from './services/firebase'

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

// Creating auth context
export const AuthContext = createContext({} as AuthContextType)

function App() {
  // creating user state
  const [user, setUser] = useState<User>()

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

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {/* Exact informa que o endereço DEVE ser exato ao path */}
        <Route path='/' exact component={Home}/>
        <Route path='/rooms/new' component={NewRoom}/>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
