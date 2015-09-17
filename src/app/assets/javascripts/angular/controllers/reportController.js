(function() {
  angular
  .module('nexbus')
  .controller('ReportController', ["$scope", "$http", "$route", "$location", ReportController]);

function ReportController($scope, $http, $route, $location) {
  $scope.fullnessLevels = ['empty', 'half full', 'full'];
  $scope.submitReport = function(busType, fullnessLevel) {
    alert('submitting bus type: ' + $("#bus-type").val() + ' and fullness level: ' + $("#fullness-level").val());
    var submitPath = window.location.host + '/api/v1/sightings';
    //$http.post('submitPath', { busType: $("#bus-type").val(), fullessLevel: $("#fullness-level").val() });
    initializeReportForm();
    $(".alert-block").text('Thank you for your submission!');
  }

  var params = $route.current.params;

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

  $(window).load(initializeReportForm);

  function initializeReportForm() {
    var firstBusType = $(".bus-type").first()[0];
    selectBusType(firstBusType);

    var firstFullnessLevel = $(".fullness-level").first()[0];
    selectFullnessLevel(firstFullnessLevel);
  }
}
})();