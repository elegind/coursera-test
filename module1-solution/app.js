(function(){

  //strict mode so the global namespace is not polluted
  'use strict';

  //declaration of the angular app and controller
  angular.module("LunchCheck",[])
  .controller('LunchCheckController', LunchCheckController);
  
  //injection of scope service dependency to the Luncheck controller
  LunchCheckController.$inject = ['$scope'];
  
  //javascript function representing the Luncheck controller
  function LunchCheckController($scope){
	$scope.list="";
	$scope.maxItems=3;
    $scope.stateMessage="";
	$scope.stateMessageColor="green";
	
    $scope.checkIfTooMuch= function(){
	  var stringList = $scope.list;
	  var items = stringList.split(',');
	  if(items && items.length < 4){
		$scope.stateMessage="Enjoy!";
		$scope.stateMessageColor="green";
	  }else{
		$scope.stateMessage="Too much!";
		$scope.stateMessageColor="red";
	  }
    };
  }
 })();
