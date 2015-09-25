(function() {
  angular
  .module('nexbus')
  .controller('MainController', ["$location", "ipCookie", MainController]);

function MainController($location, ipCookie) {
  if (ipCookie('user') !== undefined) {
    $location.path('/location');
  } else {
    $location.path('/login');
  }
}
})();
