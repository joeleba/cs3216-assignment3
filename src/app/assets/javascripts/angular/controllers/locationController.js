(function() {
  angular
    .module('nexbus')
    .controller('LocationController', ['$scope', '$http', '$location', '$timeout',
    '$localStorage', '$sessionStorage', LocationController]);

  function LocationController($scope, $http, $location, $timeout, $localStorage, $sessionStorage) {
    $scope.page = $location.path();
    $scope.allStops = [];
    $scope.locationRevealed = false;
    $scope.loading = true;
    $scope.hasError = false;

    // Callback when the location is handled correctly
    $scope.toServer = function (geo) {
      var lat = geo.coords.latitude
        , lon = geo.coords.longitude
        , query = ['?lat=', lat, '&lon=', lon].join('');
      var currentCoords = {};
      currentCoords.lat = lat;
      currentCoords.lon = lon;

      // Only send request if lat and lon are present
      if (lat==='' || lon==='') {
        $scope.getAllStops();
      } else if (typeof $sessionStorage.coords !== 'undefined' &&
        hasNotMoved(currentCoords, $sessionStorage.coords)) {
        $scope.locationRevealed = true;
        $scope.allStops = $sessionStorage.nearbyStops;
        $scope.stopLoadingIndicators();
      } else {
        $http.get('/api/v1/locations' + query).then(function (res) {
          $scope.locationRevealed = true;
          $scope.allStops = res.data.nearby_stops;
          $scope.stopLoadingIndicators();
          $sessionStorage.nearbyStops = $scope.allStops;
          $sessionStorage.coords = currentCoords;
        }, function (err) {
          if (hasNotMoved(currentCoords, $sessionStorage.coords)){
            $scope.allStops = $sessionStorage.nearbyStops;
          }
          $scope.handleError(err);
        });
      }
    };

    // Callback to handle errors
    $scope.showError = function (error) {
      switch (error.code) {
        case 1:
          $scope.error = {status: 401, error: error,
            message: "User denied the request for Geolocation."};
          break;
        case 2:
          $scope.error = {status: 401, error: error,
            message: "Location information is unavailable." };
          break;
        case 3:
          $scope.error = {status: 408, error: error,
            message: "The request to get user location timed out."};
          break;
        default:
          $scope.error = {status: 500, error: error,
            message: "An unknown error occurred."};
          break;
      }
      $scope.$apply();
      $scope.locationRevealed = false;
      $scope.hasError = true;
      console.log(error);
      $scope.getAllStops();
    };

    // Returns true if it was able to retrieve from the cache
    function retrievedCachedStops(onlyNearbyStops) {
      if ($sessionStorage.nearbyStops && onlyNearbyStops) { // Short circuit on cache
        $scope.loading = false,
        $scope.locationRevealed = true;
        $scope.allStops = $sessionStorage.nearbyStops;
      } else if ($localStorage.allStops && !onlyNearbyStops) {
        $scope.loading = false;
        $scope.allStops = $localStorage.allStops;
      } else {
        return false
      }
      return true
    }

    function hasNotMoved(curr, last) {
      var deltalat, deltalon;

      deltalat = Math.abs(curr.lat - last.lat);
      deltalon = Math.abs(curr.lon - last.lon);

      return (deltalat <= 0.001 && deltalon <= 0.001);
    }

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
        $scope.allStops = response.data;
        $scope.stopLoadingIndicators();
        $localStorage.allStops = $scope.allStops;
      }, function(err) {
        retrievedCachedStops(false);
        $scope.handleError(err);
      });
    };

    $scope.clientGetLocation = function () {
      $scope.clientLoading = true; // Ensure loading due to interactions with caching
      $scope.getLocation();
    }

    $scope.clientGetAllStops = function() {
      $scope.clientLoading = true;
      $scope.getAllStops();
    }

    $scope.handleError = function(err) {
      $scope.hasError = true;
      $scope.error = err;
    }

    $scope.stopLoadingIndicators = function() {
      $timeout(function() {
        $scope.loading = false;
        $scope.clientLoading = false;
      }, 1000);
    }

    if ($location.path() === '/location' && !retrievedCachedStops(true)) {
      $scope.getLocation();
    } else if ($location.path() === '/all' &&!retrievedCachedStops(false)) {
      $scope.getAllStops();
    }
  }
})();
