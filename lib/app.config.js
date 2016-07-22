'use strict';

module.exports = appConfig;
appConfig.$inject = ['$routeProvider', '$httpProvider'];

function appConfig($routeProvider, $httpProvider) {

  // HTTP Interceptor - Call Auth on 401
  $httpProvider.interceptors.push('bgInterceptor');

  $routeProvider.
    when('/game/:gameid', {
      templateUrl: 'gamestage.html',
      controller: 'gameCtrl',
      controlerAs: 'game'
    }).
    when('/mygames', {
      templateUrl: 'mygames.html',
      controller: 'mygames',
      controlerAs: 'mygames'
    }).
    when('/joingame', {
      templateUrl: 'joingame.html',
      controller: 'joingame',
      controlerAs: 'joingame'
    }).
    when('/', {
      templateUrl: 'home.html'
    }).
    when('/login', {
      templateUrl: 'login.html',
      controller: 'auth'
    }).
    when('/signup', {
      templateUrl: 'signup.html',
      controller: 'auth'
    }).
    otherwise({
      templateUrl: 'home.html'
    });

}
