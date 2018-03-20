import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignUpForm from '../forms/SignUpForm';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

export default class SignUpPage extends Component {
  render() {
    const token = window.localStorage.getItem('token');
    if (token) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <NavBar />
        <div className="">
          <div className="container w-40">
            <SignUpForm />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
