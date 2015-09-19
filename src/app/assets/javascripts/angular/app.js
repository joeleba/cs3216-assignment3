(function() {
  'use strict';

  var app = angular
        .module('nexbus', ['ngRoute', 'ngAnimate', 'ngTouch', 'templates']);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'ng-index.html',
        controller: 'MainController'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
      })
      .when('/main', {
        templateUrl: 'timings.html',
        controller: 'TimingsController'
      })
      .when('/location', {
        templateUrl: 'location.html',
        controller: 'LocationController'
      })
      .when('/all', {
        templateUrl: 'all.html',
        controller: 'LocationController'
      })
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
  });
})();
