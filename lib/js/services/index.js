'use strict';

var app = require('angular').module('battlegrid');

module.exports = function() {
  app.service('socket', require('./socket'));
};
