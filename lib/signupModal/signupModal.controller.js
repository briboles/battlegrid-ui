'use strict';

module.exports = bgSignupModalCtrl;

bgSignupModalCtrl.$inject = ['$http', '$scope', 'bgAuth'];

function bgSignupModalCtrl($hhtp, $scope, auth) {

  this.cancel = $scope.$dismiss;

  this.submit = function () {

    createNewUser().then(function(res) {
      console.log('user created');
      console.log(res);
    }).catch(function(err) {
      console.log('catch');
      console.log(err);
    })
    $scope.$close(); 
  };

  function validateInput() {
    return isSet($scope.username) 
        && isSet($scope.email)
        && isSet($scope.password)
        && isSet($scope.name)
  }

  function createNewUser() {
    var request = {
      method: 'POST',
      url: '/api/signup',
      data: {
        username : $scope.username,
        password : $scope.password,
        name     : $scope.name,
        email    : $scope.email
      }
    };
   return $http(request); 
  }

  function isSet(item) {
    return (typeof item === 'string' && item.length > 0) 
        || typeof item !== 'undefined' 
        && typeof item !== 'null'  
  }
}
