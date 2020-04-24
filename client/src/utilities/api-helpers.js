import { isAuthenticated } from './auth-helpers';
const axios = require('axios');

export const register = (user) => {
  return fetch('/api/v1/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res);
};

export const signin = (data) => {
  return fetch('/user_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res);
};

// DOES NOT WORK - problem with formData FIXME
// export const fileUploader = (formData) => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json'
//     },
//     body: formData
//   }
//   return fetch('http://localhost:3001/api/v1/galleries', options)
//     .then(res => console.log(res));
// }

export const fileUploader = (formData) => {
  const token = isAuthenticated()['jwt'];
  if(token) {
    return axios.post('/api/v1/galleries', formData, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => res);
  }
}

export const fetchGalleryImages = (id) => {
  // const token = isAuthenticated()['jwt'];
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
    }
  }
  return fetch(`/api/v1/galleries/${id}`, options)
    .then(res => res);
}

export const fetchGalleriesImages = () => {
  // const token = isAuthenticated()['jwt'];
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
    }
  }
  return fetch(`/api/v1/galleries`, options)
    .then(res => res);
}