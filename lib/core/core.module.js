'use strict';

module.exports = 'bg.core';

// Core Modules required for app that do not fit specifically inside one component.

require('angular')
  .module('bg.core', [])
  .service('bgSocket', require('./socket.service'));
