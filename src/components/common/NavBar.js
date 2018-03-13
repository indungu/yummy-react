import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand App-title" href="/">Yummy Recipes</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a href="/">Home</a>
          </li>
        </ul>
        <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
          <li className="nav-item active">
            <a href="/signup">Sign Up</a>
          </li>
          <li className="nav-item active">
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
