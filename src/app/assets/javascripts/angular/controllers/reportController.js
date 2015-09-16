(function() {
  angular
  .module('nexbus')
  .controller('ReportController', ["$scope", "$http", ReportController]);

function ReportController($scope, $http) {
  $scope.busTypes = ['A1', 'A2', 'B', 'C', 'D1', 'D2', 'UT-CLB'];
  $scope.fullnessLevels = ['empty', 'half full', 'full'];
  $scope.submitReport = function(busType, fullnessLevel) {
    alert('submitting bus type: ' + $("#bus-type").val() + ' and fullness level: ' + $("#fullness-level").val());
    var submitPath = window.location.host + '/api/v1/sightings';
    //$http.post('submitPath', { busType: $("#bus-type").val(), fullessLevel: $("#fullness-level").val() });
    initializeReportForm();
    $(".alert-block").text('Thank you for your submission!');
  }

  $(document).ready(initializeReportForm);

  function initializeReportForm() {
    var firstBusType = $(".bus-type").first()[0];
    selectBusType(firstBusType);

    var firstFullnessLevel = $(".fullness-level").first()[0];
    selectFullnessLevel(firstFullnessLevel);
  }
}
})();