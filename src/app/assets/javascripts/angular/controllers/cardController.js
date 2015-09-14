(function() {
  angular
  .module('nexbus')
  .controller('CardController', ["$scope", CardController]);

  function CardController($scope) {
    $scope.showSchedule = true;
  }
})();
