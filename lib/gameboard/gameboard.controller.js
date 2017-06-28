'use strict';

var _ = require('lodash');

module.exports = gameboardController;
gameboardController.$inject = [];

function gameboardController() {

  var vm = this;
  var rows = ['A','B','C','D','E','F','G','H','I','J'];
  var col  = [1,2,3,4,5,6,7,8,9,10];
  var board = {};

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
      item.onClick = _.partial(onClick, item);
      board[rows[i]][col[j]] = item;
    }
  }

  vm.rows = rows;
  vm.col = col;
  vm.board = board;

  function onClick(item) {
    console.log(item);
  }
}