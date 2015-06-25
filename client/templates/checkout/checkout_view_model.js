CheckoutViewModel = function(args){
  var self = this;

  //basics
  this.name = ko.observable(args.name);
  this.email = ko.observable(args.email);
  this.description = ko.computed(function(){
    return "Checkout for " + self.name();
  });

  //shipping address
  this.shipping_address = {};
  var addressKeys =_.keys(args.address);
  _.each(addressKeys, function(key){
    self.shipping_address[key] = ko.observable(args.address[key])
  });

  //instrumentation
  this.terms_accepted = ko.observable(false);
  this.showCheckoutForm = ko.observable(true);
  this.showProgressBar = ko.computed(function(){
    return !self.showCheckoutForm();
  });
  this.needShipping = ko.computed(function(){
    return !(self.shipping_address.street() &&
    self.shipping_address.city() &&
    self.shipping_address.state() &&
    self.shipping_address.zip());
  });

  this.needNameAndEmail = ko.computed(function(){
    return !(self.name() && self.email());
  });

  this.processor = ko.observable("stripe");

  this.payment_ready = ko.computed(function(){
    //terms need to be accepted, shipping filled out, name and email
    var ready = (!self.needNameAndEmail() &&
    !self.needShipping() &&
    self.terms_accepted());

    return ready;
  });

  //submission
  this.loadStripeCheckout = function(){

    var handler = StripeCheckout.configure({
      //should be set in settings
      key: Meteor.settings.public.stripePublicKey,
      image: '/images/logo-small.png',
      zipCode : true,
      email : self.email(),
      allowRememberMe : true,
      address : true,
      token: handleToken
    });


    handler.open({
      name: 'The Rocket Shop',
      description: checkoutModel.description(),
      amount: currentCart.total
    });
  };

  handleToken = function(token){

    //turn off the checkout form
    window.scrollTo(0,0);
    self.showCheckoutForm(false);

    //we have the token, tack the information we need onto the cart, then send it off
    var checkout = {
      name : self.name(),
      email : self.email(),
      description : self.description(),
      ip : token.client_ip,
      country_code : token.card.country,
      cart_id : currentCart._id,
      shipping_address : {
        street : self.shipping_address.street(),
        street2 : self.shipping_address.street(),
        city : self.shipping_address.street(),
        state : self.shipping_address.street(),
        country : self.shipping_address.street(),
        zip : self.shipping_address.street()
      },
      billing_address : {
        street : token.card.address_line1,
        street2 : token.card.address_line2,
        city : token.card.address_city,
        state : token.card.address_state,
        country : token.card.address_country,
        zip : token.card.address_zip
      },
      token : token
    };

    //call to processCharge
    processPayment(checkout,function(err,res){
      if(res.success){
        //console.log(res);
        Router.go("receiptShow", {id: res.receipt_id});
      }else{
        sAlert.error(res.message);
      }
    });
  };

};