// import fetch from 'isomorphic-fetch';

require('isomorphic-fetch');
require('es6-promise').polyfill();

function performRequest(url, options) {
  options.credentials = 'same-origin';
  options.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/x-www-form-urlencoded',
  };

  return fetch(url, options);
}

const dataToQuery = data =>
  Object.keys(data)
  .reduce((prev, next) => prev.concat(`${next}=${encodeURIComponent(data[next])}`), [])
  .join('&');


const Api = {
  registerUser(data) {
    return performRequest('/api/users/create', {
      method: 'PUT',
      body: dataToQuery(data),
    }).then(response => response.json());
  },
  userLogin(data) {
    return performRequest('/api/users/login', {
      method: 'POST',
      body: dataToQuery(data),
    }).then(response => response.json());
  },
};

export default Api;
