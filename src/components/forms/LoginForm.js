import React from 'react';

const LoginForm = (props) => {
  return (
    <div>
      <form
        className="auth-form needs-validation"
        onSubmit={props.onSubmit}
      >
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={props.onChange}
            autoComplete="current_email"
            placeholder="john.doe@user.com"
            required
          />
          <div className="valid-feedback">Ok</div>
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
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
            required
          />
          <div className="valid-feedback">Ok</div>
          <div className="invalid-feedback">
            Please enter a password.
          </div>
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
