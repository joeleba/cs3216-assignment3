(function() {
  var app = angular
            .module('nexbus');

  app.factory('asyncQ', ['$sessionStorage', '$q', '$http', '$timeout', function($sessionStorage, $q, $http, $timeout) {
    var queue, rejected, deferred,
        sighting, sightings,
        hasError, failures, successes;
    successes = 0;
    failures = 0;
    rejected = [];

    queue = [];
    deferred = $q.defer();

    function startQueue(){
      sightings = $sessionStorage.cachedSightings.slice();

      queue = sightings.map(function(s) {
        return $http.post('/api/v1/sightings', s);
      })

      $q.all(queue)
        .then(function(res) {
          res.map(function(r) {
            if (r.data.result === 'success') {
              successes += 1
            }
          });
          delete $sessionStorage.cachedSightings;
          deferred.resolve({message: 'Successfully submitted ' + successes + ' sightings spotted while offline.'});
        }, function(err) {
          deferred.resolve(err);
        })

      return deferred.promise;
    }
    return {
      postOfflineSightings: function () {
        return startQueue();
      }
    };

  }])
})();
