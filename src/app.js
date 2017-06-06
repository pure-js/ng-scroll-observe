function MainCtrl($scope, $log) {
  var vm = this;
  
  vm.myAlert = function () {
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

      angular.element($window).bind('scroll', () => {
        if (isVisible(element) && !fired) {
          scope.$apply(attrs.scrollObserve);
        }

        fired = isVisible(element);
        scope.$digest();
      });
    }
  });
