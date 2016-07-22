'use strict';

module.exports = bgSignupModal;
bgSignupModal.$inject = ['$uibModal'];

function bgSignupModal($uibModal) {

    return function() {
      var instance = $uibModal.open({
        templateUrl: 'signupModal/signupModal.html',
        controller: 'bgSignupModalCtrl',
        controllerAs: 'bgSignupModalCtrl'
      });

      return instance.result;
    };

}
