'use strict';

module.exports = bgLoginModal;
bgLoginModal.$inject = ['$uibModal'];

function bgLoginModal($uibModal) {

    return function() {
      var instance = $uibModal.open({
        templateUrl: 'loginModal/loginModal.html',
        controller: 'bgLoginModalCtrl',
        controllerAs: 'bgLoginModalCtrl',
        size: 'sm'
      });

      return instance.result;
    };

}
