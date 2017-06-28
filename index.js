'use strict';

require('angular');
require('angular-animate');
require('angular-route');
require('angular-cookies');
require('angular-ui-bootstrap');

require('./lib/preboot')().then(function appStart() {

  // Define battlegrid app
  require('angular').module('bg', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ui.bootstrap',
    'bg.preboot',

    require('./lib/core/core.module'),

    // Components
    require('./lib/loginModal/loginModal.module'),
    require('./lib/interceptor/interceptor.module'),
    require('./lib/signupModal/signupModal.module'),
    require('./lib/navbar/navbar.module'),
    require('./lib/gameboard/gameboard.module'),
    require('./lib/auth/auth.module'),
    require('./lib/sockettest/sockettest')
  ])
  .config(require('./lib/app.config')); 

  // start bootstrap
  angular.element(document).ready(function () {
    angular.bootstrap(document, ['bg'], { strictDi: true });
  });
});

