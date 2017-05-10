'use strict';

module.exports = function () {
  return require('socket.io-client')('http://battlegrid-angular.nimblegaming.com', {path: '/api/socket.io' });
};
