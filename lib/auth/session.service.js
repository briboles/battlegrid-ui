'use strict';

module.exports = sessionService;
sessionService.$inject = [];

function sessionService() {
  var srv ={};
  var currentUser;
  var userLoggedIn = false;
  srv.setCurrentUser = setCurrentUser;
  srv.getCurrentUser = getCurrentUser;
  srv.loggedInUser = loggedInUser;
  srv.logout = logout;

  function setCurrentUser(user) {
    currentUser = user;
    userLoggedIn = true;
  }

  function getCurrentUser() {
    return currentUser;
  }

  function logout() {
    currentUser = null;
    userLoggedIn = false;
  }

  function loggedInUser() {
    return userLoggedIn;
  }

  return srv;
}
