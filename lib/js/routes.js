'use strict';

var app = require('angular').module('battlegrid');
module.exports = function() {
  app.config(['$routeProvider', routeConfig]);
};

function routeConfig($routeProvider) {
  $routeProvider.
    when('/game/:gameid', {
      templateUrl: 'views/gamestage.html',
      controller: 'gameCtrl',
      controlerAs: 'game'
    }).
    when('/mygames', {
      templateUrl: 'views/mygames.html',
      controller: 'mygames',
      controlerAs: 'mygames'
    }).
    when('/joingame', {
      templateUrl: 'views/joingame.html',
      controller: 'joingame',
      controlerAs: 'joingame'
    }).
    when('/', {
      templateUrl: 'views/home.html'
    }).
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'auth'
    }).
    when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'auth'
    }).
    otherwise({
      templateUrl: 'views/home.html'
    });
}
