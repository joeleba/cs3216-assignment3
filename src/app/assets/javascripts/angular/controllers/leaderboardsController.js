(function() {
  angular
  .module('nexbus')
  .controller('LeaderboardsController',
  ["$scope", "$http", "$location", "$sessionStorage", LeaderboardsController]);

  function LeaderboardsController($scope, $http, $location, $sessionStorage) {
    $scope.page = $location.path();
    $scope.leaderboard = [];

    function getLeaderboard() {
      $http.get('/api/v1/users').
      then(function(res) {
        $scope.leaderboard = res.data;
        $sessionStorage.leaderboardUsers = $scope.leaderboard;
      }, function (err) {
        $scope.error = err;
      });
    }

    if ($sessionStorage.leaderboardUsers) {
      $scope.leaderboard = $sessionStorage.leaderboardUsers;
    } else {
      getLeaderboard();
    }
  }
})();
