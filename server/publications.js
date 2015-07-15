Meteor.publish("featured-products", function(){
  return Products.featured();
});

Meteor.publish("vendors", function(){
  return Vendors.find();
});

Meteor.publish("products-by-vendor", function(slug){
  check(slug, String);
  return Products.find({"vendor.slug" : slug})
});

Meteor.publish("products-by-sku", function(sku){
  check(sku, String);
  return Products.find({sku : sku});
});

Meteor.publish("cart", function(key){
  check(key, String);
  return Carts.find({userKey : key});
});
