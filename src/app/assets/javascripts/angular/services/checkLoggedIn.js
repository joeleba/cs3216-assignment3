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

//// Async
//var deferred = $q.defer();
//
//// Send GET request to check whether user is signed in
//return $http.get('/auth/signed_in').
//  then(function(res) {
//    if (res.data.user !== null) {
//      deferred.resolve();
//      return deferred.promise;
//    } else {
//      deferred.reject("Not Signed In");
//      return deferred.promise;
//    }
//  }, function(err) {
//    $scope.error = err;
//  });