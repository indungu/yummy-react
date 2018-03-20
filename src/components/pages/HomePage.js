import React from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

const HomePage = () => {
  const token = window.localStorage.getItem('token');
  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="App">
      <NavBar />
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="well">
                <h1 className="App-title">Welcome foodie,</h1>
                <p className="lead">Yummy Recipes is a platform for you to keep track of your awesome recipes and share with others if you so wish.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="well">
                <h3>New foodie?</h3>
                <a href="/signup" className="btn btn-outline-primary btn-block">Sign Up</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="well">
                <h3>Returning foodie?</h3>
                <a href="/login" className="btn btn-outline-success btn-block">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
