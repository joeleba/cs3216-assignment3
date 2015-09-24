(function() {
  angular
  .module('nexbus')
  .controller('ReportController', ["$scope", "$http", "$route", "$location", ReportController]);

function ReportController($scope, $http, $route, $location) {
  $scope.fullnessLevels = ['empty', 'half full', 'full'];

  var params = $route.current.params;

  $scope.submitReport = function(serviceId, fullnessLevel) {
    var serviceId = $("#busType").val();
    var stopId = params.stopId;
    var fullnessStatus = $scope.fullnessLevels.indexOf($("#fullnessLevel").val());

    $http.post('/api/v1/sightings', { service_id: serviceId, stop_id: stopId, status: fullnessStatus }).
      then(function(res) {
        $(".alert-block").text('Thank you for your submission!');
        location.reload();
      }, function(err) {
        // ========================
        //  Add error handler here
        // ========================
        console.log(err);
      });
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
    $http.get('/api/v1/stops/' + stop_id + '/services').
      then(function(res) {
        $scope.serviceData = res.data;
        var initialBusService = $scope.serviceData[0].id;
        $("#busType").val(initialBusService);
        var initialFullnessLevel = $scope.fullnessLevels[0];
        $("#fullnessLevel").val(initialFullnessLevel);
      }, function(err) {
        $scope.serviceData = {};
        $scope.error = err;
      });
  };

  // Path matches /stop/:stopId
  if ($location.path().match(/\/stop\/\d+/)) {
    $scope.getStopName(params.stopId);
    $scope.getServicesAt(params.stopId);
  }
}
})();
