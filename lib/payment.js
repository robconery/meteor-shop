if(Meteor.isClient){

  processPayment = function(checkout, next){
    Meteor.call("processPayment", checkout, next);
  };

  getReceipt = function(key, next){
    return Meteor.call("getReceipt", key, next);
  };
}

if(Meteor.isServer){
  Meteor.methods({
    getReceipt : function(key){
      check(key, String);
      return SalesRepo.getReceipt(key);
    },
    processPayment : function(checkout){
      check(checkout, Match.ObjectIncluding({
        cart_id: String
      }));

      //never trust the client, build the sale from the saved data
      var cart = Carts.findOne({_id : checkout.cart_id});

      //set the total
      checkout.total = cart.total;

      //set the items - have to use stringify to make sure it's saved as an array
      checkout.items = JSON.stringify(cart.items);

      //drop the response info onto the checkout object
      checkout.payment_details = StripeService.runCharge(checkout);

      //create a unique id
      checkout.reference_key = Meteor.uuid();

      //empty the cart
      Meteor.call("emptyCart", cart.userKey);

      //drop it in the DB
      return SalesRepo.saveCheckout(checkout);


    }
  })
}