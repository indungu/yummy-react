import React from 'react';

const LoginForm = (props) => {
  return (
    <div>
      <form className="auth-form" onSubmit={props.onSubmit}>
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={props.onChange}
            autoComplete="current_email"
            placeholder="john.doe@user.com"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={props.onChange}
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
};

export default LoginForm;
