'use strict';

module.exports = 'bg.sockettest';

require('angular')
  .module('bg.sockettest', [])
  .controller('sockettest', [ 'bgSocket', 'bgLoginModal', function(bgSocket, bgLoginModal) {

    bgSocket.on('connect', function(){ console.log('connected');});
    bgSocket.on('GameCreated', function(data){console.log('GameCreated',data);});
    bgSocket.on('disconnect', function(){ console.log('disconnected');});
    setTimeout(function() {
      console.log('emit ran');
      bgSocket.emit('CreateNewGame', {});
      bgLoginModal().then(function() {
        console.log('after modal.');
      })
      .catch(function() {
        console.log('catch path');
      });
    }, 500);

  }]);
