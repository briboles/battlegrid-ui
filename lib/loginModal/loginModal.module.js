'use strict';

module.exports = 'bg.loginModal';

require('angular')
  .module('bg.loginModal', [ 'ui.bootstrap'])
  .controller('bgLoginModalCtrl', require('./loginModal.controller'))
  .service('bgLoginModal', require('./loginModal.service'));
