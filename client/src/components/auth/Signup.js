import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import checkInputValidity from '../../utilities/CheckValidity';
import { signup, resetAuth } from '../../store/actions/index';

export class Signup extends React.Component {
  state = {
    name: {
      value: '',
      validation: {
        required: true,
        minLength: 3
      },
      valid: false
    },
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
    password_confirmation: {
      value: '',
      validation: {
        required: true,
        minLength: 8,
        maxLength: 72,
        match: true
      },
      valid: false
    },
    formIsValid: false,
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.register(
      this.state.name.value,
      this.state.email.value,
      this.state.password.value,
      this.state.password_confirmation.value
    )    
  };

  onChangeHandler = (e, name) => {
    // update state
    const value = e.target.value;
    const clone = { ...this.state };
    clone[name].valid = checkInputValidity(value, clone[name].validation);
    clone[name].value = value;

    let isValid = true;
    for(let prop in clone){
      if(prop === 'name' || prop === 'email' || prop === 'password' || prop === 'password_confirmation'){
        isValid = clone[prop].valid && isValid;
      }
    }
    if(clone.password.value !== clone.password_confirmation.value)
      clone.password_confirmation.valid = false;

    isValid = clone.password.value === clone.password_confirmation.value && isValid;
    clone.formIsValid = isValid;
    this.setState({ ...clone })
  };

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
      name: nameUpdate,
      email: emailUpdate,
      password: passwordUpdate,
      password_confirmation: passwordConfirmationUpdate,
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

        <h1 className="center">Signup page</h1>

        <form onSubmit={ this.onSubmitHandler }>
          <div className="Input">
            <label className="Label">Name</label>
            <input
              name="name"
              type="text"
              onChange={ (e) => this.onChangeHandler(e, "name") }
              placeholder="Your full name"
              value={ this.state.name.value }
            />
          </div>
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
            <label className="Label">Confirm password</label>
            <input
              name="password_confirmation"
              type="password"
              onChange={ (e) => this.onChangeHandler(e, "password_confirmation") }
              placeholder="Confirm password"
              value={ this.state.password_confirmation.value }
            />
          </div>

          <div className="Input">
            <input
              type="submit"
              disabled={ !this.state.formIsValid }
              value="Signup"
            />
          </div>
        </form>  
  
        <p className="center">Already registered?&nbsp;
          <strong>
            <NavLink to="/login">Login</NavLink>
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
};

const mapDispatchToProps = dispatch => {
  return {
    register: (name, email, password, password_confirmation) => dispatch(signup(name, email, password, password_confirmation)),
    resetError: () => dispatch(resetAuth())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);