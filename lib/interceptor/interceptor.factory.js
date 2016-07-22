'use strict';

module.exports = interceptor;

interceptor.$inject = ['$injector', '$q'];
function interceptor($injector, $q) {

  // Log any AJAX request errors longer than threshold.  Ignore any urls matching string in ingnorelist.
  function responseError(resErr) {
    // Manually injecting rootScope to access emitting events.
    var auth = $injector.get('bgAuth');
    var http = $injector.get('$http');

    // If a 401 is detected, require user to login then retry any pending requests.
    if (resErr.status === 401 && resErr.config.url.indexOf('api/login') === -1) {
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
