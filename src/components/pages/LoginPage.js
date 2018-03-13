import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="w-40">
            <LoginForm />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
