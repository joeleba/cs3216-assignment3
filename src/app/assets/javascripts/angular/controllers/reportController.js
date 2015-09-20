(function() {
  angular
  .module('nexbus')
  .controller('ReportController', ["$scope", "$http", "$route", "$location", ReportController]);

function ReportController($scope, $http, $route, $location) {
  $scope.fullnessLevels = ['empty', 'half full', 'full'];

  var params = $route.current.params;
  var fullnessLevels = ["empty", "half-full", "full"];

  $scope.submitReport = function(serviceId, fullnessLevel) {
    alert('submitting bus type: ' + $("#busType").val() + ' and fullness level: ' + $("#fullnessLevel").val());
    var serviceId = $("#busType").val();
    var stopId = params.stop_id;
    var fullnessStatus = fullnessLevels.indexOf($("#fullnessLevel").val());

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
      }, function(err) {
        $scope.serviceData = {};
        $scope.error = err;
      });
  };

  if ($location.path() === '/main') {
    $scope.getStopName(params.stop_id);
    $scope.getServicesAt(params.stop_id);
  }

  $(window).load(function() {
    initializeReportForm();
  });

  function initializeReportForm() {
    var firstBusType = $(".bus-type").first()[0];
    selectBusType(firstBusType);

    var firstFullnessLevel = $(".fullness-level").first()[0];
    selectFullnessLevel(firstFullnessLevel);
  }
}
})();