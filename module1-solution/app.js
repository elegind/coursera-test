(function(){

  //strict mode so the global namespace is not polluted
  'use strict';

  //declaration of the angular app and controller
  angular.module("LunchCheck",[])
  .controller('LunchCheckController', LunchCheckController);

  //injection of scope service dependency to the Luncheck controller protected from minification
  LunchCheckController.$inject = ['$scope'];

  //function representing the Luncheck controller
  function LunchCheckController($scope){
    //variables declaration
    $scope.list="";
    $scope.maxItems=3;
    $scope.messageColor="red";

    //check if there is not too much items in the list
    $scope.checkIfTooMuch= function(){
      var stringList = $scope.list;
      var items = stringList.split(',');
      //if stringList empty then we ask to enter something first
      if(stringList===""){
        $scope.message="Please enter data first";
        $scope.messageColor="red";
      //if less than 4 items then we display Enjoy!
      }else if(items.length <= $scope.maxItems){
        $scope.message="Enjoy!";
        $scope.messageColor="green";
      //if more than 3 items then we display Too much!
      }else{
        $scope.message="Too much!";
        $scope.messageColor="red";
      }
    };
  }
})();
