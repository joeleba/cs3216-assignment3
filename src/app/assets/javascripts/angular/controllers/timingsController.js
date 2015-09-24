(function() {
  angular
  .module('nexbus')
  .controller('TimingsController', ["$scope", "$http", "$route", "$location",
  "$timeout", TimingsController]);

function TimingsController($scope, $http, $route, $location, $timeout) {

  var params = $route.current.params;

  $scope.loading = true;
  $scope.clientLoading = false;
  $scope.hasError = false;

  // Returns the selected Stop name given the stop_id
  $scope.getStopName = function(stop_id) {
    $http.get('/api/v1/stops/' + stop_id, { cache: true }).
      then(function(res) {
        $scope.currentStopName = res.data.name;
      }, function(err) {
        $scope.currentStopName = '';
        $scope.handleError(err);
      })
  };

  // Returns all the Services available at a particular Stop
  $scope.getServicesAt = function(stop_id) {
    $http.get('/api/v1/stops/' + stop_id + '/services', { cache: true }).
      then(function(res) {
        $scope.serviceData = res.data;
        getSightingsForServices(params.stopId, $scope.serviceData);
      }, function(err) {
        $scope.serviceData = {};
        $scope.handleError(err);
      });
  };

  // Retrieves the Sighting data for the Services specified
  function getSightingsForServices(stop_id, services) {
    var svc;
    $scope.sightingsData = [];
    for (var i=0; i<services.length; i++) {
      svc = services[i];
      getSighting(params.stopId, svc.id, svc.name);
    }
    if (!$scope.hasError) {
      $scope.stopLoadingIndicators();
    }
  };

  // Returns the Sighting data for a particular Service
  function getSighting(stop_id, service_id, service_name) {
    $http.get('/api/v1/sightings?service_id=' + service_id + '&stop_id=' +
    stop_id).
      then(function(res) {
      var busData = {};
      var detail = res.data.prev_stops.status;
      var lastSeen;
      var thisStopMinutes = res.data.this_stop === 'No data' ? '' : ' m ago';

      if (res.data.prev_stops.last_seen !== '') {
        lastSeen = res.data.prev_stops.stop.name + ' | ' + res.data.prev_stops.last_seen + ' m ago';
      } else {
        lastSeen = 'No data';
      }

      // This is quite messy and should be refactored in the future
      busData["name"] = service_name;
      busData["thisLastSeen"] = res.data.this_stop + thisStopMinutes;
      busData["otherLastSeen"] = lastSeen;
      busData["detail"] = detail === "" ? false : true;
      busData["capacity"] = detail;
      $scope.sightingsData.push(busData);
    }, function(err) {
      $scope.handleError(err);
    });
  };

  $scope.handleError = function(err) {
    $scope.stopLoadingIndicators();
    $scope.hasError = true;
    $scope.error = err;
  }

  $scope.stopLoadingIndicators = function() {
    $timeout(function() {
      $scope.loading = false;
      $scope.clientLoading = false;
    }, 1000);
  }

  // Hack due to some push.js and angularjs compatibility issue
  $scope.goTo = function(path) {
    $location.path(path);
    $location.search({});
  }

  $scope.getSightingsAtStop = function (clientInitiated) {
    $scope.clientLoading = clientInitiated;
    // Path matches /stop/:stopId
    if ($location.path().match(/\/stop\/\d+/)) {
      $scope.getStopName(params.stopId);
      $scope.getServicesAt(params.stopId);
    }
  }

  $scope.closeModal = function() {
    $('#contributeModal').removeClass('active');
  }

  $scope.openModal = function() {
    $('#contributeModal').addClass('active');
  }

  $scope.getSightingsAtStop(false);
}
})();
