'use strict';

module.exports = 'bg.gameboard';

require('angular')
  .module('bg.gameboard', [])
  .directive('bgGameboard', require('./gameboard.directive'));