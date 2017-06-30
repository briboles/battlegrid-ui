'use strict';

module.exports = GameService;
GameService.$inject = ['$rootScope', 'bgSocket'];

function GameService($rootScope, bgSocket) {

  var vm = this;

  vm.createNewGame = createNewGame;
  vm.submitTargetCords = submitTargetCords;

  bgSocket.on('connect', function(data) {
    console.log('Socket Connected', data);
  });

  bgSocket.on('GameCreated', notifyGameCreated);

  function createNewGame() {
    bgSocket.emit('CreateNewGame', {});
  }

  function submitTargetCords(row, col) {
    bgSocket.emit('TargetCords', { row: row, col: col });
  }

  function notifyGameCreated(data) {
    console.log('GameCreated', data);
    $rootScope.$broadcast('GameCreated', data);
  }

}