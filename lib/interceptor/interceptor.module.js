'use strict';

module.exports = 'bg.interceptor';

require('angular')
  .module('bg.interceptor', [])
  .factory('bgInterceptor', require('./interceptor.factory'));
