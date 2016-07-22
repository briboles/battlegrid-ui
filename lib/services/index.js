'use strict';

module.exports = 'bg.services';

require('angular')
  .module('bg.services', [])
  .service('bgsocket', require('./socket'));
