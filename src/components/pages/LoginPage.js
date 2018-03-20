import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import axiosInstance from '../common/AxiosIntance';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

export default class LoginPage extends Component {
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
        window.localStorage.setItem('token', response.data.access_token);
        this.props.history.push('/dashboard');
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  }
  render() {
    const token = window.localStorage.getItem('token');
    if (token) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <NavBar />
        <ToastContainer />
        <div className="container">
          <div className="w-40">
            <LoginForm
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
