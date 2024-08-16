angular.module('example', [])
  .factory('timer', function($interval) {
    return rxjs.interval(1000).pipe(
      rxjs.map(() => Date.now()),
    );
  })
  .controller('MainCtrl', function ($scope, timer) {
    $scope.time = null;
    console.log(timer);
  })
  .directive('timer', function() {
    return {
      restrict: 'E',
      scope: {
        time: '=',
        format: '=',
      },  
      template: `
        <div>
          {{ time | date:'yyyy-MM-dd HH:mm:ss' }}
        </div>
      `,
      link: function (scope, element, attrs, controllers) {
        console.log('linked', scope, element, attrs, controllers);

        console.log(attrs);
      }
    }
  })
  .controller('Controller', function($scope) {
    $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
    $scope.igor = { name: 'Igor', address: '123 Somewhere' };

    $scope.test = function() {
      console.log('!!');
    }
  })
  .directive('myCustomer', function() {
    return {
      scope: {
        info: '=',
      },
      template: 'Name: {{ info.name }} Address: {{ info.address }}'
    };
  })
  .component('customer', {
    bindings: {
      onClick: '&',
    },
    template: `
      <div>My Customer Component</div>
      <button ng-click="$ctrl.onClick()">Btn</button>
    `,
  });