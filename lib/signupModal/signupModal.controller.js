'use strict';

module.exports = bgSignupModalCtrl;

bgSignupModalCtrl.$inject = ['$scope', 'bgAuth'];

function bgSignupModalCtrl($scope, auth) {

  this.cancel = $scope.$dismiss;

  this.submit = function () {
    console.log($scope.email, $scope.password, $scope.name);
    $scope.$close(); 
  };

}
