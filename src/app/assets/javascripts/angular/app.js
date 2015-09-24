(function() {
  'use strict';

  var app = angular
        .module('nexbus', ['ngRoute', 'ngAnimate', 'ngTouch',
                           'templates', 'ngStorage']);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'location.html',
        controller: 'MainController'
      })
      .when('/login', {
        templateUrl: 'ng-index.html',
        controller: 'LoginController'
      })
      .when('/stop/:stopId', {
        templateUrl: 'timings.html',
        resolve: {
          authenticated: ['checkLoggedIn', function(checkLoggedIn) {
            return checkLoggedIn();
          }]
        }
      })
      .when('/location', {
        templateUrl: 'location.html',
        resolve: {
          authenticated: ['checkLoggedIn', function(checkLoggedIn) {
            return checkLoggedIn();
          }]
        }
      })
      .when('/all', {
        templateUrl: 'all.html',
        resolve: {
          authenticated: ['checkLoggedIn', function(checkLoggedIn) {
            return checkLoggedIn();
          }]
        }
      })
      .when('/leaderboards', {
        templateUrl: 'leaderboards.html',
        resolve: {
          authenticated: ['checkLoggedIn', function(checkLoggedIn) {
            return checkLoggedIn();
          }]
        }
      });
  }])
  .run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      console.log(rejection);
      $location.path('/login');
    });
  }]);

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
