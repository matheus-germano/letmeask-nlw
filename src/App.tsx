import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      {/* Exact informa que o endereço DEVE ser exato ao path */}
      <AuthContextProvider>
        <Route path='/' exact component={Home}/>
        <Route path='/rooms/new' component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
