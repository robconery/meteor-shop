Router.configure({
  layoutTemplate : 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn : function(){
    return [Meteor.subscribe("vendors"),
      Meteor.subscribe("cart", userKey)];
  }
});

Router.route("/", {
  name : "homeIndex",
  waitOn : function(){
    return Meteor.subscribe("featured-products");
  }
});
Router.route("/about", {
  name : "homeAbout"
});
Router.route("/contact", {
  name : "homeContact"
});
Router.route("/products/:sku", {
  name : "productsShow",
  waitOn : function(){
    return Meteor.subscribe("products-by-sku", this.params.sku);
  },
  data : function(){
    return Products.findOne({sku : this.params.sku});
  }
});
Router.route("/vendors/:slug", {
  name : "vendorsShow",
  waitOn : function(){
    return Meteor.subscribe("products-by-vendor", this.params.slug);
  },
  data : function(){
    return Vendors.findOne({slug : this.params.slug});
  }
});
Router.route("/cart", {
  name : "cartShow"
});

Router.route("/checkout",{
  name: "checkoutShow"
});

Router.route("/receipt/:id", {
  name : "receiptShow",
  data : function(){
    return {id : this.params.id};
  }
});
