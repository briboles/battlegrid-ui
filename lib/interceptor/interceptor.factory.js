'use strict';

var _ = require('lodash');

module.exports = interceptor;

interceptor.$inject = ['$injector', '$q'];
function interceptor($injector, $q) {

  // Log any AJAX request errors longer than threshold.  Ignore any urls matching string in ingnorelist.
  function responseError(resErr) {
    // Manually injecting rootScope to access emitting events.
    var auth = $injector.get('bgAuth');
    var http = $injector.get('$http');

    var ignoreUrls = [
      'api/login',
      'api/auth'
    ];

    // If a 401 is detected, require user to login then retry any pending requests.
    if (resErr.status === 401 && _.some(ignoreUrls, resErr.config.url)) {
      console.log(resErr.config.url);
      return auth.login()
        .then(function() {
          return http(resErr.config);
        })
        .catch(function() {
          return $q.reject(resErr);
        });
    }
    else {
      return $q.reject(resErr);
    }
  }

  return({
    responseError: responseError
  });
}
