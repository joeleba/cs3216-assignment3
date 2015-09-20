(function() {
  angular
    .module('nexbus')
    .controller('LocationController', ["$scope", "$http",
    '$location', LocationController]);

  function LocationController($scope, $http, $location) {
    $scope.page = $location.path();
    $scope.allStops = [];
    $scope.locationRevealed = false;
    $scope.loading = true;

    // Callback when the location is handled correctly
    $scope.toServer = function (geo) {
      var lat = geo.coords.latitude
        , lon = geo.coords.longitude
        , query = ['?lat=', lat, '&lon=', lon].join('');

      // Only send request if lat and lon are present
      if (lat==='' || lon==='') {
        $scope.getAllStops();
      } else {
        $http.get('/api/v1/locations' + query).then(function (res) {
          $scope.loading = false;
          $scope.locationRevealed = true;
          $scope.allStops = res.data.nearby_stops;
        }, function (err) {
          $scope.error = err;
        });
      }
    };

    // Callback to handle errors
    $scope.showError = function (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          $scope.error = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          $scope.error = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          $scope.error = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          $scope.error = "An unknown error occurred.";
          break;
      }
      $scope.$apply();
      $scope.getAllStops();
    };

    // Main function to get location
    $scope.getLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition($scope.toServer, $scope.showError, {timeout:10000});
      }
      else {
        $scope.error = "Geolocation is not supported by this browser.";
      }
    };

    $scope.getAllStops = function () {
      $http.get('/api/v1/stops').
      then(function(response) {
        $scope.loading = false;
        $scope.allStops = response.data;
      }, function(err) {
        $scope.allStops = [];
        $scope.error = err;
      });
    };

    if ($location.path() === '/location') {
      $scope.getLocation();
    } else if ($location.path() === '/all') {
      $scope.getAllStops();
    }
  }
})();
