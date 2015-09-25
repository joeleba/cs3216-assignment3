(function() {
  'use strict';

  var app = angular
        .module('nexbus', ['ngRoute', 'ngAnimate', 'ngTouch',
                           'templates', 'ngStorage', 'ipCookie']);

  //app.config(['$authProvider', function($authProvider) {
  //
  //  // the following shows the default values. values passed to this method
  //  // will extend the defaults using angular.extend
  //  $authProvider.configure({
  //    apiUrl:                  '/',
  //    tokenValidationPath:     '/auth/validate_token',
  //    signOutUrl:              '/auth/sign_out',
  //    emailRegistrationPath:   '/auth',
  //    accountUpdatePath:       '/auth',
  //    accountDeletePath:       '/auth',
  //    confirmationSuccessUrl:  window.location.href,
  //    passwordResetPath:       '/auth/password',
  //    passwordUpdatePath:      '/auth/password',
  //    passwordResetSuccessUrl: window.location.href,
  //    emailSignInPath:         '/auth/sign_in',
  //    storage:                 'cookies',
  //    forceValidateToken:      false,
  //    validateOnPageLoad:      true,
  //    proxyIf:                 function() { return false; },
  //    proxyUrl:                '/proxy',
  //    omniauthWindowType:      'sameWindow',
  //    authProviderPaths: {
  //      facebook: '/auth/facebook',
  //    },
  //    tokenFormat: {
  //      "access-token": "{{ token }}",
  //      "token-type":   "Bearer",
  //      "client":       "{{ clientId }}",
  //      "expiry":       "{{ expiry }}",
  //      "uid":          "{{ uid }}"
  //    },
  //    parseExpiry: function(headers) {
  //      // convert from UTC ruby (seconds) to UTC js (milliseconds)
  //      return (parseInt(headers['expiry']) * 1000) || null;
  //    },
  //    handleLoginResponse: function(response) {
  //      return response.data;
  //    },
  //    handleAccountUpdateResponse: function(response) {
  //      return response.data;
  //    },
  //    handleTokenValidationResponse: function(response) {
  //      return response.data;
  //    }
  //  });
  //}]);
  //resolve: {
  //  auth: function($auth) {
  //    return $auth.validateUser();
  //  }
  //}

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'location.html',
        controller: 'MainController'
        //resolve: {
        //  authenticated: ['checkLoggedIn', function(checkLoggedIn) {
        //    return checkLoggedIn();
        //  }]
        //}
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
