(function() {
  angular
  .module('nexbus')
  .controller('ReportController', ["$scope", "$rootScope", "$http", "$route", "$location", "$sessionStorage", ReportController]);

function ReportController($scope, $rootScope, $http, $route, $location, $sessionStorage) {
  $scope.fullnessLevels = ['empty', 'half full', 'full'];

  var params = $route.current.params;

  $scope.submitReport = function(serviceId, fullnessLevel) {
    var fallbackOnCache = $rootScope.shouldQueue;
    var serviceId = $("#busType").val();
    var stopId = params.stopId;
    var fullnessStatus = $scope.fullnessLevels.indexOf($("#fullnessLevel").val());
    var time_seen = Math.ceil((new Date()).getTime()/1000);
    var sighting = { service_id: serviceId, stop_id: stopId, status: fullnessStatus, time_seen: time_seen };

    if (!fallbackOnCache) {
      $http.post('/api/v1/sightings', sighting).
        then(function(res) {
          $(".alert-block").text('Thank you for your submission!');
          location.reload();
        }, function(err) {
          alert('Oops, something went wrong with your submission. Try again in a few minutes?');
        });
    } else {
      undef = typeof $sessionStorage.cachedSightings === 'undefined';
      $sessionStorage.cachedSightings = undef ? [] : $sessionStorage.cachedSightings;
      $sessionStorage.cachedSightings.push(sighting);
      location.reload();
    }
  }

  // Returns the selected Stop name given the stop_id
  $scope.getStopName = function(stop_id) {
    $http.get('/api/v1/stops/' + stop_id).
      then(function(res) {
        $scope.currentStopName = res.data.name;
      }, function(err) {
        $scope.currentStopName = '';
        $scope.error = err;
      })
  };

  // Returns all the Services available at a particular Stop
  $scope.getServicesAt = function(stop_id) {
    var fallbackOnCache = $rootScope.shouldQueue;
    var cachedServiceData = $sessionStorage.serviceData;
    if (fallbackOnCache && $scope.exists(cachedServiceData)) {
      $scope.serviceData = cachedServiceData[stop_id]
    } else if (!fallbackOnCache) {
      $http.get('/api/v1/stops/' + stop_id + '/services').
        then(function(res) {
          $scope.serviceData = res.data;
          // Update cache with latest data available
          $sessionStorage.serviceData = {};
          $sessionStorage.serviceData[stop_id] = res.data;
          var initialBusService = $scope.serviceData[0].id;
          $("#busType").val(initialBusService);
          var initialFullnessLevel = $scope.fullnessLevels[0];
          $("#fullnessLevel").val(initialFullnessLevel);
        }, function(err) {
          if ($scope.exists(cachedServiceData)) {
            $scope.serviceData = cachedServiceData[stop_id];
          }
          $scope.error = err;
        });
    } else {
      $scope.serviceData = {};
      $scope.error = {status: 500,
        message: 'There was no cached data and the User is offline.'};
    }
  };

  $scope.exists = function(data) {
    return typeof data === 'undefined';
  }

  // Path matches /stop/:stopId
  if ($location.path().match(/\/stop\/\d+/)) {
    $scope.getStopName(params.stopId);
    $scope.getServicesAt(params.stopId);
  }
}
})();
