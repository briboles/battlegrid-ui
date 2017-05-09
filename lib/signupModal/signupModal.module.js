'use strict';

module.exports = 'bg.signupModal';

require('angular')
  .module('bg.signupModal', ['ui.bootstrap'])
  .controller('bgSignupModalCtrl', require('./signupModal.controller'))
  .service('bgSignupModal', require('./signupModal.service'));
