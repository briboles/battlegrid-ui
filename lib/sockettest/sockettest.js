'use strict';

module.exports = 'bg.sockettest';

require('angular')
  .module('bg.sockettest', [])
  .controller('sockettest', ['$http', 'bgSocket', 'bgLoginModal', 'bgSignupModal', function($http, bgSocket, bgLoginModal, bgSignupModal) {
    
    $http.get('/api/auth').then(function(res) {
      console.log('auth');
      console.log(res);
    })
    .catch(function(err) {
      console.log('auth catch');
      console.log(err);
    })

    bgSocket.on('connect', function(){ console.log('connected');});
    bgSocket.on('GameCreated', function(data){console.log('GameCreated',data);});
    bgSocket.on('disconnect', function(){ console.log('disconnected');});
    setTimeout(function() {
      console.log('emit ran');
      bgSocket.emit('CreateNewGame', {});
      bgSignupModal().then(function() {
        console.log('after modal.');
      })
      .catch(function() {
        console.log('catch path');
      });
    }, 500);

  }]);
