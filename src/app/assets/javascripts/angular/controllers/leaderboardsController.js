(function() {
  angular
  .module('nexbus')
  .controller('LeaderboardsController',
  ["$scope", "$http", "$location", LeaderboardsController]);

  function LeaderboardsController($scope, $http, $location) {
    $scope.page = $location.path();

    $scope.allUsers = [{name: 'Colin', credits: '1000000'}];
  }
})();
