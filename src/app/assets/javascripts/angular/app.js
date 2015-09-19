(function() {
  'use strict';

  var app = angular
        .module('nexbus', ['ngRoute', 'ngAnimate', 'ngTouch', 'templates']);

  app
    .config(['$routeProvider', function($routeProvider, checkLoggedIn){
    $routeProvider
      .when('/#', {
        controller: 'MainController'
      })
      .when('/login', {
        templateUrl: 'ng-index.html',
        controller: 'LoginController'
      })
      .when('/main', {
        templateUrl: 'timings.html',
        controller: 'TimingsController',
        resolve: {
          authenticated: function(checkLoggedIn) {
            return checkLoggedIn();
          };
        }
      })
      .when('/location', {
        templateUrl: 'location.html',
        controller: 'LocationController',
        resolve: {
          authenticated: function(checkLoggedIn) {
            return checkLoggedIn();
          };
        }
      })
      .when('/all', {
        templateUrl: 'all.html',
        controller: 'LocationController',
        resolve: {
          authenticated: function(checkLoggedIn) {
            return checkLoggedIn();
          };
        }
      })
      .when('/leaderboards', {
        templateUrl: 'leaderboards.html',
        controller: 'LeaderboardsController',
        resolve: {
          authenticated: function(checkLoggedIn) {
            return checkLoggedIn();
          };
        }
      })
      .otherwise({redirectTo: '/location'});
  }])
  .run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
      $location.path('/login');
    });
  });

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
  });
})();
