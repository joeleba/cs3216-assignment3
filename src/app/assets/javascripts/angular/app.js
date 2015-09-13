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
        templateUrl: 'card.html',
        controller: 'CardController'
      })
      .when('/report', {
        templateUrl: 'report.html',
        controller: 'ReportController'
      })
  }]);

  app.directive('nbTimings', function() {
    return {
      templateUrl: 'timings.html'
    };
  });
})();
