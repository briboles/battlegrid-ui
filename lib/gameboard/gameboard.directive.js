'use strict';

module.exports = gameboardDirective;
gameboardDirective.$inject = [];

function gameboardDirective() {
  return {
    restrict: 'E',
    templateUrl: 'gameboard/gameboard.html',
    controller: require('./gameboard.controller'),
    controllerAs: 'gb',
    scope: {}
  }
}