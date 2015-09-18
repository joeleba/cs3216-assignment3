(function() {
  angular
    .module('nexbus')
    .factory('checkLoggedIn', function($q, $http) {
      return function() {
        var deferred = $q.defer();

        $http.get('/auth/signed_in').
          then(function(res) {
            if (res) {
              console.log("Signed In");
              console.log(res);
              deferred.resolve("Signed In");
            } else {
              console.log("not signed in");
              console.log(res);
              deferred.reject("Not Signed In");
            }
          }, function(err) {
            console.log(err);
          });
      }
    });
})();