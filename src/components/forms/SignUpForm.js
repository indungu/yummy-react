import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../common/AxiosIntance';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      redirect: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      // Get request data from form state.
      const requestData = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };

      // Make call to api through axios
      axiosInstance
        .post('/auth/register', requestData)
        .then((response) => {
          toast.success(response.data.message);
          this.setState({ redirect: true });
        })
        .catch((error) => {
          const errors = error.response.data.errors;
          if (errors) {
            this.reportErrors(errors);
          }
        });
    } else {
      toast.error('Password mismatch. Please try again');
    }
    return 0;
  }

  // Error reporter
  reportErrors(errors) {
    Object.keys(errors).map((fieldName) => {
      return errors[fieldName].map((errorMessage) => {
        return toast.error(errorMessage);
      });
    });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <ToastContainer />
        <form className="auth-form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="control-label">Username</label>
            <input
              value={this.state.username}
              type="text"
              name="username"
              className="form-control"
              placeholder="John"
              onChange={this.onChange}
              autoComplete="current_username"
              required
            />
          </div>
          <div className="form-group">
            <label className="control-label">Email</label>
            <input
              value={this.state.email}
              type="email"
              name="email"
              className="form-control"
              onChange={this.onChange}
              autoComplete="current_email"
              placeholder="john.doe@user.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="control-label">Password</label>
            <input
              value={this.state.password}
              type="password"
              name="password"
              className="form-control"
              onChange={this.onChange}
              autoComplete="current_password"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label className="control-label">Confirm Password</label>
            <input
              value={this.state.confirmPassword}
              type="password"
              name="confirmPassword"
              className="form-control"
              onChange={this.onChange}
              autoComplete="current_password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <span
            className="text-muted"
            style={{ fontSize: '9px', paddingBottom: '10% !important' }}
          >
            Password should contain at least one special character,
            One digit and one uppercase and lowercase letter.
            Password should not be less than 8 characters long
          </span>
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              onClick={this.onSubmit}
              id="submitInfo"
            >
              Sign Up
            </button>
          </div>
          <div className="well">
            <span>Already have an account? <a href="/login">Login</a></span>
          </div>
        </form>
      </div>
    );
  }
}
