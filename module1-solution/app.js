(function(){
  'use strict';

  angular.module("myFirstApp",[])
  .controller('MyFirstController', function($scope){
    $scope.name="Jimmy";
    $scope.sayHello= function(){
      return "Hello coursera";
    };
  })
})();
