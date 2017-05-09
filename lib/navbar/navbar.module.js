'use strict';

module.exports = 'bg.navbar';

require('angular')
  .module('bg.navbar', [])
  .directive('bgNavbar', require('./navbar.directive'));
