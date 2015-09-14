(function() {
  angular
  .module('nexbus')
  .controller('TimingsController', [TimingsController]);

function TimingsController($scope) {
  $scope.busData = [{name: 'A1', capacity: 'full', arrivalTiming: '20 min', lastSeen: '5m ago at YIH', showArrivalTiming: false},
                    {name: 'A2', capacity: 'full', arrivalTiming: '20 min', lastSeen: '10m ago at Museum', showArrivalTiming: false},
                    {name: 'B', capacity: 'empty', arrivalTiming: '1 min', lastSeen: '3m ago at EA', showArrivalTiming: false},
                    {name: 'C', capacity: 'empty', arrivalTiming: '2 min', lastSeen: '1m ago at PGP', showArrivalTiming: false},
                    {name: 'D1', capacity: 'average', arrivalTiming: '10 min', lastSeen: '', showArrivalTiming: false, direction: 'UTown to Biz'},
                    {name: 'D2', capacity: 'full', arrivalTiming: '6 min', lastSeen: '', showArrivalTiming: false},
                    {name: 'UT-CLB', capacity: 'average', arrivalTiming: '2 min', lastSeen: '2m ago at CLB', showArrivalTiming: false}];
}
})();
