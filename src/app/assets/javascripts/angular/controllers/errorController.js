(function() {
  angular
  .module('nexbus')
  .controller('ErrorController', ['$scope', ErrorController]);

  function ErrorController($scope) {
    // Set a default error
    $scope.error = {status: 404, message: 'Not Found'}
    $scope.loading = false;
    $scope.hasError = true;
  }
})();
