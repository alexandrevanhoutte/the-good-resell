import React, {useState} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import useToken from './useToken';
import AppBar from './components/AppBar/AppBar'

function App() {
  const {token, setToken } = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <div className="wrapper">
      <AppBar />
      <BrowserRouter>
        <Switch>
          <Route path="/"><Dashboard /></Route>
          <Route path="/preferences"><Preferences /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
