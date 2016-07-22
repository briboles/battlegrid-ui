'use strict';

module.exports = authService;
authService.$inject = ['$http'];

function authService($http) {
  var srv = {};

  srv.login = login;
  srv.logout = logout;
  srv.signup = signup;

  function login(username, password) {
    var postData = {
      username: username,
      password: password
    };
    return $http.post('/api/login', postData);
  }

  function logout() {
    return $http.get('/api/logout');
  }

  function signup(userData) {
    /*
      var userData = {
        username: username, // Required
     	  email: email,
     	  password: password, // Required
        name: displayName
      };
    */
    return $http.post('/api/signup', userData);
  }

  return srv;
}
