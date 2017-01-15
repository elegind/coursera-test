(function(){

  //strict mode so the global namespace is not polluted
  'use strict';

  //declaration of the angular app and controller
  angular.module("ShoppingListCheckOff",[])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // dependency injection protected from minification
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  //function representing the ToBuy controller
  function ToBuyController(ShoppingListCheckOffService){
    //variables declaration
    this.products = ShoppingListCheckOffService.getProductListToBuy();

    this.buyProduct = function(index){
      ShoppingListCheckOffService.buyProduct(index);
      //this.products = ShoppingListCheckOffService.getProductListToBuy();
    };

  }

  //function representing the AlreadyBought controller
  function AlreadyBoughtController(ShoppingListCheckOffService){
    this.products = ShoppingListCheckOffService.getProductListAlreadyBought();
  }

  function ShoppingListCheckOffService(){
    var shoppingService = this;
    //business variable shared between the controllers, arrays of products to buy or already bought
    var productListToBuy = [{ name: "cookies", quantity: 10 }, { name: "eggs", quantity: 12 }, { name: "water bottles", quantity: 4 }, { name: "fishes", quantity: 2 } , { name: "soda can", quantity: 1 }];
    var productListAlreadyBought = [];

    shoppingService.getProductListToBuy = function(){
      return productListToBuy;
    };

    shoppingService.getProductListAlreadyBought = function(){
      return productListAlreadyBought;
    };

    shoppingService.buyProduct(index){
      productListAlreadyBought.push(productListToBuy[index]);
      productListToBuy.slice(index,1);
    };

  }
})();
