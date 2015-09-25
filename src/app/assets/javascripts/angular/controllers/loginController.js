(function() {
  angular
  .module('nexbus')
  .controller('LoginController', ["$scope", "$window", "ipCookie", "$http", "$location", LoginController]);

function LoginController($scope, $window, ipCookie, $http, $location) {
  $scope.facebookAuth = function() {
    // Hack due to push.js and angularjs compatibility issues
    $window.location.href = '/auth/facebook';
  };
  // Check if user is logged in. Then store value to cookie
  $http.get('/auth/signed_in').
    then(function (res) {
      if (res.data.user !== null) {
        ipCookie('user', res.data.user, { expires: 24, expirationUnit: 'hours'});
        $location.path('/location');
      } else {
        $location.path('/login');
      }
    }, function (err) {
      $scope.error = err;
    });
}
})();
