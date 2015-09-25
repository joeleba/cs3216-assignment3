(function() {
  angular
    .module('nexbus')
    .factory('checkLoggedIn', ['$q', 'ipCookie', function($q, ipCookie) {
      return function() {
        var deferred = $q.defer();
        if (ipCookie('user') !== undefined) {
          deferred.resolve();
          return deferred.promise;
        } else {
          deferred.reject("Not Signed In");
          return deferred.promise;
        }
      }
    }]);
})();
