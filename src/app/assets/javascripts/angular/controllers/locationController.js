(function() {
  angular
    .module('nexbus')
    .controller('LocationController', ["$scope", "$http",
    '$location', LocationController]);

  function LocationController($scope, $http, $location) {
    $scope.allStops = [];
    $scope.locationRevealed = false;

    // Callback when the location is handled correctly
    $scope.toServer = function (coords) {
      var lat = coords.latitude
        , lon = coords.longitude
        , query = ['?lat=', lat, '&lon=', lon].join('');

      $http.get('/api/v1/locations' + query).then(function(res) {
        // Proper code will be added later after I wrote the back end.
        $scope.allStops = res.data;
        $scope.locationRevealed = true;
      }, function(err) {
        console.log(err);
      });
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
        navigator.geolocation.getCurrentPosition($scope.toServer, $scope.showError);
      }
      else {
        $scope.error = "Geolocation is not supported by this browser.";
      }
    };

    $scope.getAllStops = function () {
      $http.get('/api/v1/stops').
      then(function(response) {
        $scope.allStops = response.data;
      }, function(err) {
        $scope.allStops = [];
        $scope.error = err;
      });
    };

    if ($location.path() === '/location') {
      $scope.getAllStops();
    }
  }
})();
