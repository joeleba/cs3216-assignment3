(function() {
  angular
  .module('nexbus')
  .controller('ReportController', ReportController);

function ReportController($scope) {
  $scope.busTypes = ['A1', 'A2', 'B', 'C', 'D1', 'D2', 'UT-CLB'];
  $scope.fullnessLevels = ['empty', 'ok lah', 'full'];
}
})();