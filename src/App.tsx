import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home/index'
import { NewRoom } from './pages/NewRoom/index';
import { Room } from './pages/Room/index';
import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      {/* Exact informa que o endereço DEVE ser exato ao path */}
      <AuthContextProvider>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/rooms/new' component={NewRoom}/>
          <Route path='/rooms/:id' component={Room}/>

          <Route path='/admin/rooms/:id' component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
