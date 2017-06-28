'use strict';

var _ = require('lodash');

module.exports = gameboardController;
gameboardController.$inject = [];

function gameboardController() {

  var vm = this;
  var rows = ['A','B','C','D','E','F','G','H','I','J'];
  var col  = [1,2,3,4,5,6,7,8,9,10];
  var board = {};

  var selectedItem;

  for(var i = 0; i < 10; i++) {
    board[rows[i]] = {}
    for(var j = 0; j < 10; j++) {
      var item = {
        row: rows[i],
        col: col[j],
        name: rows[i] + col[j],
        hit: false,
        miss: false,
        selected: false
      }
      item.onClick = _.partial(selectOnClick, item);
      board[rows[i]][col[j]] = item;
    }
  }

  vm.rows = rows;
  vm.col = col;
  vm.board = board;
  vm.confirmSelection = confirmSelection;

  function selectOnClick(item) {
    removeSelected()
    vm.selectionPending = true;
    item.selected = true;
    selectedItem = item;
  }
  
  function confirmSelection() {
    vm.board[selectedItem.row][selectedItem.col].hit = true;
    vm.board[selectedItem.row][selectedItem.col].selected = false;
    vm.selectionPending = false;
    selectedRow = null;
    selectedCol = null;
  }

  function removeSelected() {
    _.forEach(vm.board, function(n) {
      _.forEach(n, function(t) {
        t.selected = false;
      });
    });
  }
}