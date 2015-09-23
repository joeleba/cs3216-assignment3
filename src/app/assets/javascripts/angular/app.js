(function() {
  'use strict';

  var app = angular
        .module('nexbus', ['ngRoute', 'ngAnimate', 'ngTouch',
                           'templates', 'ngStorage']);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'ng-index.html',
        controller: 'MainController'
      })
      .when('/login', {
        templateUrl: 'ng-index.html',
        controller: 'LoginController'
      })
      .when('/main', {
        templateUrl: 'timings.html',
        controller: 'TimingsController',
      })
      .when('/location', {
        templateUrl: 'location.html',
        controller: 'LocationController'
      })
      .when('/all', {
        templateUrl: 'all.html',
        controller: 'LocationController',
      })
      .when('/leaderboards', {
        templateUrl: 'leaderboards.html',
        controller: 'LeaderboardsController',
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
