(function() {
  angular
  .module('nexbus')
  .controller('MainController', ["$scope", "$location", "$cookies", MainController]);

function MainController($scope, $location, $cookies) {

  if ($cookies.getObject('user') !== undefined) {
    $location.path('/location');
  } else {
    $location.path('/login');
  }
  //$http.get('/auth/signed_in').
  //  then(function (res) {
  //    if (res.data.user !== null) {
  //      $location.path('/location');
  //    } else {
  //      $location.path('/login');
  //    }
  //  }, function (err) {
  //    $scope.error = err;
  //  });
  //}
}
})();
