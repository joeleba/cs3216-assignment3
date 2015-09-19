(function() {
  angular
  .module('nexbus')
  .controller('MainController', function MainController($scope, $location, $http) {
    $http.get('/auth/signed_in').
      then(function(res) {
        if (res.data.user !== null) {
          console.log('logged in');
          $location.path('/location');
        } else {
          console.log('not logged in');
          $location.path('/login');
        }
      }, function(err) {
        console.log(err);
      });
  })
})();
