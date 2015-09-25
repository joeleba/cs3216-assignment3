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
  }])
  .run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
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
  app.run(['$window', '$rootScope', 'asyncQ', '$sessionStorage', '$interval', function($window, $rootScope, asyncQ, $sessionStorage, $interval) {
    $rootScope.shouldQueue = false;
    $rootScope.postOfflineSightings = function () {
      if (typeof $sessionStorage.cachedSightings !== 'undefined') {
        asyncQ.postOfflineSightings()
              .then(function(res) {
                alert(res.message);
                if ($rootScope.hasInterval) {
                  $interval.cancel($rootScope.interval);
                }
              }, function(reason) {
                if ($rootScope.hasInterval === false) {
                  $rootScope.initiateRetry();
                }
              });
      } else {
        if ($rootScope.hasInterval) {
          $interval.cancel($rootScope.interval);
        }
      }
    }

    $rootScope.initiateRetry = function () {
      $rootScope.interval = $interval($rootScope.postOfflineSightings(), 60000, 10)
                            .then(function(res) {

                            }, function(err) {
                              var errors = $sessionStorage.cachedSightings.length;
                              delete $sessionStorage.cachedSightings;
                              alert('Oops, unable to submit ' + errors + ' sightings submitted offline. Sorry!');
                            });
    }

    $rootScope.hasInterval = function () {
      return typeof $rootScope.interval !== 'undefined';
    }

    $window.addEventListener('offline', function(event) {
      $rootScope.shouldQueue = true;
    }, false);

    $window.addEventListener('online', function(event) {
      $rootScope.shouldQueue = false;
      $rootScope.postOfflineSightings();
    }, false);
  }]);
})();
