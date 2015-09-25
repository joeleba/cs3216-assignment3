(function() {
  angular
  .module('nexbus')
  .controller('LoginController', ["$scope", "$window", "$cookies", "$http", "$location", LoginController]);

function LoginController($scope, $window, $cookies, $http, $location) {
  $scope.facebookAuth = function() {
    // Hack due to push.js and angularjs compatibility issues
    $window.location.href = '/auth/facebook';
  };
  $http.get('/auth/signed_in').
    then(function (res) {
      if (res.data.user !== null) {
        $cookies.putObject('user', res.data.user);
        $location.path('/location');
      } else {
        $location.path('/login');
      }
    }, function (err) {
      $scope.error = err;
    });

//  // Async
//  var deferred = $q.defer();
//
//  // Send GET request to check whether user is signed in
//  return $http.get('/auth/signed_in').
//    then(function(res) {
//      if (res.data.user !== null) {
//        deferred.resolve();
//        return deferred.promise;
//      } else {
//        deferred.reject("Not Signed In");
//        return deferred.promise;
//      }
//    }, function(err) {
//      $scope.error = err;
//    });
}
})();
