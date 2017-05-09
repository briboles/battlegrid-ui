'use strict';

module.exports = authService;
authService.$inject = ['$http', 'bgSession'];

function authService($http, bgSession) {
  var srv = {};

  srv.login = login;
  srv.logout = logout;
  srv.guest = guest;
  srv.signup = signup;
  srv.confirmAuth = confirmAuth;

  function login(username, password) {
    var postData = {
      username: username,
      password: password
    };
    return $http.post('/api/login', postData)
             .then(function(response) {
               bgSession.setCurrentUser(response.data);
               return response;
             });
  }

  function logout() {
    return $http.get('/api/logout')
             .then(function() {
               bgSession.logout();
             });
  }

  function guest() {
    return $http.post('/api/guest')
             .then(function(response) {
               bgSession.setCurrentUser(response.data);
               return response;
             });
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
    return $http.post('/api/signup', userData)
             .then(function(response) {
              bgSession.setCurrentUser(response.data);
              return response;
             });
  }

  function confirmAuth() {
    return $http.get('/api/auth');
  }

  return srv;
}
