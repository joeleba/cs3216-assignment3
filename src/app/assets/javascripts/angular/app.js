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
  }]);

  app.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      $location.path('/login');
    });

    // Hack due to some push.js and angularjs compatibility issue
    // Since it is function to be shared across controllers and is rather
    // small, it's placed in the $rootScope.
    $rootScope.goTo = function(path) {
      $location.path(path);
      $location.search({});
    }
  }]);
})();
