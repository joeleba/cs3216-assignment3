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
        templateUrl: 'card.html',
        controller: 'CardController',
        resolve: {
          authenticated: function(checkLoggedIn) {
            return checkLoggedIn();
          }
        }
      })
      .when('/location', {
        templateUrl: 'location.html',
        controller: 'LocationController',
        resolve: {
          authenticated: function(checkLoggedIn) {
            return checkLoggedIn();
          }
        }
      })
      .otherwise({redirectTo: '/location'});
    }])
    .run(function ($rootScope, $location) {
      $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        console.log(rejection);
        $location.path('/login');
      });
    });

  app.directive('nbTimings', function() {
    return {
      templateUrl: 'timings.html'
    };
  });
  app.directive('nbReport', function() {
    return {
      templateUrl: 'report.html'
    };
  });
  app.directive('nbLocation', function() {
    return {
      templateUrl: 'stop-selection.html'
    };
  });
})();
