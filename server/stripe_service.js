Meteor.startup(function(){

  var StripeWrapper = function(){
    this.runCharge = function(checkout){
      var stripe = Meteor.npmRequire("stripe")(Meteor.settings.stripeSecretKey);
      //process the charge...
      var stripeCall = Async.runSync(function(done){
        var charge = {
          amount: checkout.total,
          currency: "usd",
          source: checkout.token.id,
          description: checkout.description
        };
        stripe.charges.create(charge, done);
      });
      return stripeCall.result;
    };

    this.refundCharge = function(charge_id){
      //extra credit for you...
    };
  };

  StripeService = new StripeWrapper();

});