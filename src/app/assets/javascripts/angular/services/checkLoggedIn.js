(function() {
  angular
    .module('nexbus')
    .factory('checkLoggedIn', ['$q', '$cookies', function($q, $cookies) {
      return function() {
        var deferred = $q.defer();
        if ($cookies.getObject('user') !== undefined) {
          console.log($cookies.getObject('user'));
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