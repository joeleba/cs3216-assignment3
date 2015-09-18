(function() {
  angular
    .module('nexbus')
    .factory('loggedIn', function($q, $http) {
      return function() {
        var deferred = $q.defer();

        $http.get('/auth/signed_in').
          then(function(res) {
            if (res) {
              deferred.resolve();
            } else {
              deferred.reject();
            }
          }, function(err) {});
      }
    });
})();