(function() {
  angular
  .module('nexbus')
  .controller('MainController', ["$scope", "$location", "$http", MainController]);

function MainController($scope, $location, $http) {
  $http.get('/auth/signed_in').
    then(function(res) {
      if (res.data.user !== null) {
        console.log('main signed in');
        $location.path('/location');
      } else {
        console.log('main not signed in');
        $location.path('/login');
      }
    }, function(err) {
      $scope.error = err;
    });
}})();
