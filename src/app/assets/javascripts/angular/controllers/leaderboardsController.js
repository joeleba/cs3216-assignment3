(function() {
  angular
  .module('nexbus')
  .controller('LeaderboardsController',

  ["$scope", "$http", "$location", "$window", "$sessionStorage", LeaderboardsController]);

  function LeaderboardsController($scope, $http, $location, $window, $sessionStorage) {
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

    // Workaround because push.js doesn't seem to work well with the fragment identifier
    $scope.logOut = function() {
      // When caching is merged in: $sessionStorage.$reset();
      $window.location.href = '/auth/logout';
    }

    if ($sessionStorage.leaderboardUsers) {
      $scope.leaderboard = $sessionStorage.leaderboardUsers;
    } else {
      getLeaderboard();
    }
  }
})();
