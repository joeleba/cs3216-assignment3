(function() {
  angular
  .module('nexbus')
  .controller('CardController', [CardController]);

  function CardController($scope) {
    $scope.showSchedule = true;
  }
})();
