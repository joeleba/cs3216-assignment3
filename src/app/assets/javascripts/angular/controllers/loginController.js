(function() {
  angular
  .module('nexbus')
  .controller('LoginController', ["$scope", "$window", LoginController]);

function LoginController($scope, $window) {
  $scope.facebookAuth = function() {
    // Hack due to push.js and angularjs compatibility issues
    $window.location.href = '/auth/facebook';
  }

}
})();
