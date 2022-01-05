import React, { Component, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { login, clearAuthState } from '../actions/auth';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // return a function to execute at unmount
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      props.dispatch(login(email, password));
    }
  };

  const { error, inProgress, isLoggedin } = props.auth;
  console.log('location', location);

  // const { from } = this.props.location.state || { from: { pathname: '/' } };
  // const { from } = location.state.from || { from: { location: '/' } };
  const from = location.state?.from?.pathname || '/';

  if (isLoggedin) {
    return <Navigate to={from} />;
  }
  return (
    <form className="login-form">
      <span className="login-signup-header">Log In</span>
      {error && <div className="alert error-dailog">{error}</div>}
      <div className="field">
        <input
          type="email"
          placeholder="Email"
          required
          // ref={this.emailInputRef}
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="Password"
          required
          // ref={this.passwordInputRef}
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <div className="field">
        {inProgress ? (
          <button onClick={handleFormSubmit} disabled={inProgress}>
            Logging in...
          </button>
        ) : (
          <button onClick={handleFormSubmit} disabled={inProgress}>
            Log In
          </button>
        )}
      </div>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
