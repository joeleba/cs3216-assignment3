(function() {
  var app = angular.module('nexbus');

  app
  .directive('nbHeader', function() {
    return {
      templateUrl: 'header.html'
    };
  })
  .directive('nbTimings', function() {
    return {
      templateUrl: 'timings-list.html'
    };
  })
  .directive('nbReport', function() {
    return {
      templateUrl: 'report.html'
    };
  })
  .directive('nbLocation', function() {
    return {
      templateUrl: 'stop-selection.html'
    };
  })
  .directive('nbAllStops', function() {
    return {
      templateUrl: 'all-stops.html'
    };
  })
  .directive('nbBoards', function() {
    return {
      templateUrl: 'leaderboard-table.html'
    };
  })
  .directive('nbError', function() {
    return {
      templateUrl: 'error.html'
    };
  })
  .directive('nbLoading', function() {
    return {
      templateUrl: 'loading.html'
    };
  });
})();
