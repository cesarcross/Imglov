import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import checkInputValidity from '../../utilities/CheckValidity';
import { login, resetAuth } from '../../store/actions/index';

export class Login extends React.Component {
  state = {
    email: {
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false
    },
    password: {
      value: '',
      validation: {
        required: true,
        minLength: 8,
        maxLength: 72
      },
      valid: false
    },
    formIsValid: false
  }

  onChangeHandler = (e, name) => {
    const value = e.target.value;
    const clone = {
      ...this.state
    }
    clone[name].valid = checkInputValidity(value, clone[name].validation);
    clone[name].value = value;

    let isValid = true;
    for(let prop in clone){
      if(prop === 'email' || prop === 'password'){
        isValid = clone[prop].valid && isValid;
      }
    }
    clone.formIsValid = isValid;
    
    this.setState({ ...clone })
  }
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.login(this.state.email.value, this.state.password.value);
  }

  dismissErrorHandler = () => {
    const nameUpdate = {
      ...this.state.name,
      value: ''
    }
    const emailUpdate = {
      ...this.state.email,
      value: ''
    }
    const passwordUpdate = {
      ...this.state.password,
      value: ''
    }
    const passwordConfirmationUpdate = {
      ...this.state.password_confirmation,
      value: ''
    }
    // clear input fields and reset error value
    this.setState({
      email: emailUpdate,
      password: passwordUpdate
    });
    this.props.resetError();
  }

  render(){
    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to="/gallery" />;
    }

    let errorMessage = null;
    if(this.props.error) {
      errorMessage = (
        <div className="alert alert-danger" role="alert">
          <button onClick={ this.dismissErrorHandler } type="button" className="close" data-dismiss="alert">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>{ this.props.error }</strong>
        </div>
      );
    }

    return (
      <div className="App Form container">
        { authRedirect }
        { errorMessage }

        <h1 className="center">Login page</h1>

        <form onSubmit={ this.onSubmitHandler }>
          <div className="Input">
            <label className="Label">Email address</label>
            <input
              name="email"
              type="text"
              onChange={ (e) => this.onChangeHandler(e, "email") }
              placeholder="Your email address"
              value={ this.state.email.value }
            />
          </div>
          <div className="Input">
            <label className="Label">Your password</label>
            <input
              name="password"
              type="password"
              onChange={ (e) => this.onChangeHandler(e, "password") }
              placeholder="Password (minimum 8 characters)"
              value={ this.state.password.value }
            />
          </div>
          <div className="Input">
            <input
              type="submit"
              disabled={ !this.state.formIsValid }
              value="Login"
            />
          </div>
        </form> 

        <p className="center">Not registered?&nbsp;
          <strong>
            <NavLink to="/signup">Signup</NavLink>
          </strong>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email , password) => dispatch(login(email, password)),
    resetError: () => dispatch(resetAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);