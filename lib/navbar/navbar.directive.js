'use strict';

module.exports = navbar;
navbar.$inject = ['bgSession', 'bgAuth'];

function navbar(bgSession, bgAuth) {
  return {
      restrict: 'E',
      templateUrl: 'navbar/navbar.html',
      link: function(scope) {
        scope.user = function() {
          return bgSession.getCurrentUser().username;
        };
        scope.auth = function() {
          return bgSession.loggedInUser();
        };
        scope.logout = function() {
          return bgAuth.logout().then(function() {
            // This could be an angular route
            // So button just redirects to /#/logout
            // Probably the best way to do it.
          });
        }
        scope.signup = function() {

        }
    }
  };
}
