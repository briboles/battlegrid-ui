'use strict';

module.exports = bgSignupModalCtrl;

bgSignupModalCtrl.$inject = ['$scope', 'auth'];

function bgSignupModalCtrl($scope, auth) {

  this.cancel = $scope.$dismiss;

  this.submit = function () {
    console.log($scope._email, $scope._password, $scope._name);
    $scope.$close(); 
  };

}
