import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Beranda from './pages/Beranda';
import Profile from './pages/Profile';

function App() {
  const [view, setView] = useState('login');

  return (
    <div>
      {view === 'login' && <Login setView={setView} />}
      {view === 'register' && <Register setView={setView} />}
      {view === 'beranda' && <Beranda setView={setView} />}
      {view === 'profile' && <Profile setView={setView} />}
    </div>
  );
}

export default App;