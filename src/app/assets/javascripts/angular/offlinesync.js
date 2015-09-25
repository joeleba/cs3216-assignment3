(function() {
  var app = angular.module('nexbus');

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
                              //All is good
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
