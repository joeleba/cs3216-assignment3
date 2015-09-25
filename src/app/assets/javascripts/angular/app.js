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
      })
      .otherwise({
        templateUrl: '404.html'
      });
  }]);

  app.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      $location.path('/login');
    });
  }]);
})();
