import React from 'react';
import Profile from './views/Profile';
import Home from './views/Home';
import { Route } from 'react-router';

function App() {

  return (
    <>
      <Route exact path='/' render={Home} />
      <Route exact path='/profile' render={Profile} />
    </>
  )
}

export default App;
