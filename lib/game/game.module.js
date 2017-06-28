'use strict';

module.exports = 'bg.game';

require('angular')
  .module('bg.game', [])
  .service('Game', require('./game.service'));