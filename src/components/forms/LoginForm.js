import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../common/AxiosIntance';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    // Get request data from form state.
    const requestData = {
      email: this.state.email,
      password: this.state.password,
    };

    // Make call to api through axios
    axiosInstance
      .post('/auth/login', requestData)
      .then((response) => {
        toast.success(response.data.message);
        this.setState({ redirect: true });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <ToastContainer />
        <form onSubmit={this.onSubmit}>
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
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-lg">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
