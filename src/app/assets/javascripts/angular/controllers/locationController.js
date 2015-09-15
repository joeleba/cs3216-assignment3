(function() {
  angular
    .module('nexbus')
    .controller('LocationController', ["$scope", "$http", LocationController]);

  function LocationController($scope, $http) {
    $scope.nearestStops = [];

    // Callback when the location is handled correctly
    $scope.toServer = function (coords) {
      var lat = coords.latitude
        , lon = coords.longitude
        , query = ['?lat=', lat, '&lon=', lon].join('');

      $http.get('/api/v1/locations' + query).then(function(res) {
        // Proper code will be added later after I wrote the back end.
        $scope.nearestStops = res.data;
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

      // =======================================================
      // Add code to prepare list of stops to manually pick here
      // =======================================================
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
  }
})();