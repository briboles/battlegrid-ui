'use strict';

module.exports = bgLoginModalCtrl;

bgLoginModalCtrl.$inject = ['$scope', 'bgAuth'];

function bgLoginModalCtrl($scope, bgAuth) {

  $scope.username = '';
  $scope.password = '';

  $scope.cancel = $scope.$dismiss;

  $scope.submit = function () {
    if ($scope.username !== '' && $scope.password !== '') {
      bgAuth.login({
        username: $scope.username,
        password: $scope.password
      })
      .then(function() {
        $scope.$close();
      })
      .catch(function() {
        // Keep modal open and display error message to user.
        $scope.error = 'Username / Password is incorrect.';
      });
    }
  };

}
