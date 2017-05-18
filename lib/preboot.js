'use strict';

module.exports = preboot;

var angular = require('angular');
var initInjector = angular.injector(['ng']);
var $http = initInjector.get('$http');

function preboot() {
  var app = angular.module('bg.preboot', []);
  return $http.get('/api/auth')
    .then(function (result) {
      if (!result || !result.data) {
        throw new Error('Unexpected response from config API: ' + result.status);
      }
      app.constant('authState', result.data);
    })
    .catch(function (err) {
      app.constant('authState', { appFail: true, errorStatus: err.status });
    });
}
