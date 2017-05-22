'use strict';

module.exports = 'bg.sockettest';

require('angular')
  .module('bg.sockettest', [])
  .controller('sockettest', ['$http', '$scope', 'bgSocket', 'bgLoginModal', 'bgSignupModal', function($http, $scope, bgSocket, bgLoginModal, bgSignupModal) {
    
    $http.get('/api/auth').then(function(res) {
      console.log('auth');
      console.log(res);
    })
    .catch(function(err) {
      console.log('auth catch');
      console.log(err);
    });

    var rows = ['A','B','C','D','E','F','G','H','I','J'];
    var col  = [1,2,3,4,5,6,7,8,9,10];
    var board = {};

    $scope.rows = rows;
    $scope.col = col;

    for(var i = 0; i < 10; i++) {
      board[rows[i]] = {}
      for(var j = 0; j < 10; j++) {
        var item = {
          row: rows[i],
          col: col[j],
          name: rows[i] + col[j],
          hit: false,
          miss: false
        }
        board[rows[i]][col[j]] = item;
      }
    }

    $scope.board = board;
    console.log($scope.board)

    bgSocket.on('connect', function(){ console.log('connected');});
    bgSocket.on('GameCreated', function(data){console.log('GameCreated',data);});
    bgSocket.on('disconnect', function(){ console.log('disconnected');});
    setTimeout(function() {
      console.log('emit ran');
      bgSocket.emit('CreateNewGame', {});
      // bgSignupModal().then(function() {
      //   console.log('after modal.');
      // })
      // .catch(function() {
      //   console.log('catch path');
      // });
    }, 500);

  }]);
