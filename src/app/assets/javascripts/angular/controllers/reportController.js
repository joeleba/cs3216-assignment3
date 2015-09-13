(function() {
  angular
  .module('nexbus')
  .controller('ReportController', ["$scope", "$http", ReportController]);

function ReportController($scope, $http) {
  $scope.busTypes = ['A1', 'A2', 'B', 'C', 'D1', 'D2', 'UT-CLB'];
  $scope.fullnessLevels = ['empty', 'ok lah', 'full'];
  $scope.submitReport = function(busType, fullnessLevel) {
    alert('submit');
    //$http.post('path', { busType: $("#bus-type").val(), fullessLevel: $("#fullness-level").val() });
  }
}
})();