(function() {
  angular
  .module('nexbus')
  .controller('LeaderboardsController',
  ["$scope", "$http", "$location", LeaderboardsController]);

  function LeaderboardsController($scope, $http, $location) {
    $scope.page = $location.path();
    $scope.leaderboard = [];

    function getLeaderboard() {
      $http.get('/api/v1/users').
      then(function(res) {
        $scope.leaderboard = res.data;
      }, function (err) {
        $scope.error = err;
      });
    }

    getLeaderboard();
  }
})();
