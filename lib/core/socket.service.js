'use strict';

module.exports = function () {
  return require('socket.io-client')('http://battlegrid.nimblegaming.com', {path: '/api/socket.io' });
};
