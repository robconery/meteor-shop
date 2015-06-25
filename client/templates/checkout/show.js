Template.checkoutShow.helpers({
  cart : function(){
    currentCart = Carts.findOne({userKey : userKey});
    return currentCart;
  }
});

Template.checkoutShow.onRendered(function(){

  //wire up KO and some test data
  checkoutModel = new CheckoutViewModel({
    name : "Jill Test",
    email : "jill@test.com",
    address : {
      street : "12 Test Street",
      city : "Hanalei",
      state : "HI",
      zip : "96714",
      country : "US"
    }
  });

  var panel = document.getElementById("checkout-panel");
  ko.cleanNode(panel);
  ko.applyBindings(checkoutModel,panel);

});