"click #checkout" : function(ev){
  ev.preventDefault();

  //pull from viewModel
  var processor = checkoutModel.paymentType();

  // Close Checkout on page navigation
  $(window).on('popstate', function() {
    handler.close();
  });

  var handler = StripeCheckout.configure({
    //should be set in settings
    key: Stripe.publicKey,
    image: '/images/logo-small.png',
    zipCode : true,
    email : checkoutModel.email(),
    bitcoin : true,
    allowRememberMe : true,
    address : true,
    token: function(token) {
      console.log(token)
    }
  });


  handler.open({
    name: 'The Rocket Shop',
    description: checkoutModel.description(),
    amount: checkoutModel.total
  });
}