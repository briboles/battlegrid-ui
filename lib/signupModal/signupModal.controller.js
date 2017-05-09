'use strict';

module.exports = bgSignupModalCtrl;

bgSignupModalCtrl.$inject = ['$scope'];

function bgSignupModalCtrl($scope) {

  this.cancel = $scope.$dismiss;

  this.submit = function (email, password) {
    console.log(email, password);
    $scope.$close(); 
  };

}
