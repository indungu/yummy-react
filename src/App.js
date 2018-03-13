import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/HomePage';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';

const App = () => (
  <div>
    <Route path="/" exact component={ HomePage } />
    <Route path="/signup" exact component={ SignUpPage } />
    <Route path="/login" exact component={ LoginPage } />
  </div>
)

export default App;
