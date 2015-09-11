(function() {
  angular
  .module('nexbus')
  .controller('TimingsController', TimingsController);

function TimingsController($scope) {
  $scope.busData = [{name: 'A1', capacity: 'full', arrivalTiming: '20 min', lastSeen: '5m ago at YIH', showLastSeen: false},
                    {name: 'A2', capacity: 'full', arrivalTiming: '20 min', lastSeen: '10m ago at Museum', showLastSeen: false},
                    {name: 'B', capacity: 'empty', arrivalTiming: '1 min', lastSeen: '3m ago at EA', showLastSeen: false},
                    {name: 'C', capacity: 'empty', arrivalTiming: '2 min', lastSeen: '1m ago at PGP', showLastSeen: false},
                    {name: 'D1', capacity: 'average', arrivalTiming: '10 min', lastSeen: '', showLastSeen: false},
                    {name: 'D2', capacity: 'full', arrivalTiming: '6 min', lastSeen: '', showLastSeen: false},
                    {name: 'UT-CLB', capacity: 'average', arrivalTiming: '2 min', lastSeen: '2m ago at CLB', showLastSeen: false}];
}
})();
