'use strict';

module.exports = bgLoginModal;
bgLoginModal.$inject = ['$uibModal', '$rootScope'];

function bgLoginModal($uibModal, $rootScope) {

    function assignCurrentUser(user) {
      console.log('user',user)
      $rootScope.currentUser = user;
      $rootScope.authenticated = true;
    }

    return function() {
      var instance = $uibModal.open({
        templateUrl: 'loginModal/loginModal.html',
        controller: 'bgLoginModalCtrl',
        controllerAs: 'bgLoginModalCtrl',
        size: 'sm'
      });

      return instance.result.then(assignCurrentUser);
    };

}
