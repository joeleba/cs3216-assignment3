(function() {
  'use strict';

  var app = angular
        .module('nexbus', ['ngRoute', 'templates']);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'ng-index.html',
        controller: 'MainController'
      })
  }]);
})();
