function MainCtrl($scope, $log) {
  $scope.myAlert = function () {
    $log.log('Alert');
  };
}

let app = angular.module('app', [])
  .controller('MainController', MainCtrl)

  .directive('scrollObserve', function($window) {
    return {
      restrict: 'A',
      link: link
    };

    function isVisible(element) {
      let el = element[0].getBoundingClientRect();
      return ($window.innerHeight > el.top && el.bottom > 0);
    }

    function link(scope, element, attrs) {
      let fired = false;

      angular.element($window).bind('scroll', function() {
        if(isVisible(element)) {
          if(!fired) {
            scope.$apply(attrs.scrollObserve);
          }
          fired = true;
        } else {
          fired = false;
        }
        scope.$digest();
      });
    }
  });
