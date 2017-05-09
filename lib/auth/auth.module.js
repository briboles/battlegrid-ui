'use strict';

module.exports = 'bg.auth';

require('angular')
  .module('bg.auth', [])
  .service('bgAuth', require('./auth.service'))
  .service('bgSession', require('./session.service'));
