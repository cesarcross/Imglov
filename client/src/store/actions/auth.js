import * as actionTypes from './actionTypes';
import * as auth from '../../utilities/auth-helpers';
import * as api from '../../utilities/api-helpers';

const loginUser = () => {
  return {
    type: actionTypes.LOGIN_USER
  };
};

const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token
  };
};

const loginFailure = (err) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error: err
  };
};

const signupUser = () => {
  return {
    type: actionTypes.SIGNUP_USER
  };
};

const signupSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS
  };
};

const signupFailure = (error) => {
  return {
    type: actionTypes.SIGNUP_FAILURE,
    error: error
  };
};

// async action which logs the user in
export const login = (email, password) => {
  const user = {
    'email': email,
    'password': password
  };

  return (dispatch) => {
    dispatch(loginUser());
    api.signin({'auth': user})
    .then(response => {
      if(response.ok && response.status === 201){
        return response.json();
      } else {
        dispatch(loginFailure('User was not found or password is invalid'));
      }
    })
    .then(token => {
      if(token) {
        auth.saveToken(token); // save to sessionStorage
        dispatch(loginSuccess(token))
      }
    })
    .catch(err => {
      console.log('Signin error', err);
      dispatch(loginFailure('Unknown error, try again'));
    });
  }
}

export const logout = () => {
  auth.removeToken(); // remove form sessionStorage
  return {
    type: actionTypes.LOGOUT_USER
  }
}

export const resetAuth = () => {
  return {
    type: actionTypes.RESET_STATE
  }
}

// async action which registers user
export const signup = (name, email, password, password_confirmation) => {
  const user = {
    'name': name,
    'email': email,
    'password': password,
    'password_confirmation': password_confirmation
  };

  return (dispatch) => {
    dispatch(signupUser());
    api.register({'user': user})
    .then(res => {
      if(res && res.ok){
        if(res.status === 200){
          dispatch(signupSuccess());
          api.signin({
            "auth": { "email": email, "password": password }
          })
          .then(response => {
            if(response.ok && response.status === 201){
              return response.json();
            } else {
              dispatch(loginFailure('User was not found or password is invalid'));
            }
          })
          .then(token => {
            if(token) {
              auth.saveToken(token); // save to sessionStorage
              dispatch(loginSuccess(token));
            } 
          });
        } else {
          dispatch(signupFailure('User is already registered'));
          console.log('User already registered');
        }
      } else {
        dispatch(signupFailure(res.statusText));
        console.log('Signup failure', res.statusText);
      }  
    })
    .catch(err => { 
      console.log('Signup failure', err);
    });
  }
}

// log the user in if they have a token saved to sessionStorage
export const checkAuthState = () => {
  return (dispatch) => {
    const token = auth.isAuthenticated();
    (token)? dispatch(loginSuccess(token)) : dispatch(logout());
  }
};