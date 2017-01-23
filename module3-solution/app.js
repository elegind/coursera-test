(function(){
  'use strict';

  angular.module("NarrowItDownApp",[])
  .controller('NarrowItDownController', NarrowItDownController )
  .service('MenuSearchService', MenuSearchService )
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective)
  .filter('itemListFilter', itemListFilter);

  function itemListFilter() {
    return function(itemArray, searchTerm){
      if (!searchTerm) return itemArray;

      var term = searchTerm.toLowerCase();
      return itemArray.filter(function(item) {
        return item.description.toLowerCase().indexOf(term) != -1;
      });
    };
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var controller = this;

    controller.searchTerm;

    controller.getMatchedMenuItems = function(){
      if(controller.searchTerm != undefined){
          MenuSearchService.getMatchedMenuItems(controller.searchTerm).then(function(result){
            controller.found  = result;
        });
      }
    }

    controller.removeItem = function(index){
        controller.found.splice(index, 1);
    };
  };

  MenuSearchService.$inject = ['$http', 'ApiBasePath','$filter'];
  function MenuSearchService($http, ApiBasePath, $filter){
    var service  = this;
    service.getMatchedMenuItems = function(searchTerm){
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response.then(function(result){
        // process result and only keep items that match
        var foundItems = $filter('itemListFilter')(result.data.menu_items,searchTerm);

        // return processed items
        return foundItems;
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItemsList.html',
      scope: {
        foundIt: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController(){
    var foundItemsListCtrl = this;
  }


})();
