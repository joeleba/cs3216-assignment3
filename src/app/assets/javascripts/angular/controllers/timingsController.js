(function() {
  angular
  .module('nexbus')
  .controller('TimingsController', ["$scope", TimingsController]);

function TimingsController($scope) {
  $scope.busData = [{name: 'A1', capacity: 'full', arrivalTiming: '20m', lastSeenTime: '1600', lastSeenLoc: 'YIH', showDetail: false},
                    {name: 'A2', capacity: 'full', arrivalTiming: '20m', lastSeenTime: '1605', lastSeenLoc: 'Museum', showDetail: false},
                    {name: 'B', capacity: 'empty', arrivalTiming: '1m', lastSeenTime: '1556', lastSeenLoc: 'EA', showDetail: false},
                    {name: 'C', capacity: 'empty', arrivalTiming: '2m', lastSeenTime: '1601', lastSeenLoc: 'UHall', showDetail: false},
                    {name: 'D1', capacity: 'average', arrivalTiming: '10m', lastSeenTime: '1550', lastSeenLoc: 'UT', showDetail: false, direction: 'UTown to Biz'},
                    {name: 'D2', capacity: 'full', arrivalTiming: '6m', lastSeenTime: '1540', lastSeenLoc: 'Opp. UHall', showDetail: false},
                    {name: 'UT-CLB', capacity: 'average', arrivalTiming: '2m', lastSeenTime: '1557', lastSeenLoc: 'CLB', showDetail: false}];
  $scope.toggleDetail = function(bus) {
    bus.showDetail = bus.showDetail === false ? true : false;
  }
}
})();
