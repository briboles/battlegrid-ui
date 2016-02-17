'use strict';

require('angular');
require('angular-animate');
require('angular-route');
require('angular-cookies');

// Define battlegrid app
require('angular').module('battlegrid', ['ngAnimate', 'ngCookies', 'ngRoute' ]);

require('./lib/js/routes')();
require('./lib/js/directives/index')();
require('./lib/js/filters/index')();
require('./lib/js/services/index')();
require('./lib/js/controllers/index')();

// Init at bottom so services can be injected if needed.
//require('./lib/js/init')(app);
