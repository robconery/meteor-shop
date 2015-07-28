Carts = new Mongo.Collection("carts");

Carts.forUser = function(key){
  return Carts.findOne({userKey : key});
};

Carts.empty = function(key){
  return Carts.remove({userKey : key});
};

Carts.getCart = function(key){
  var cart = Carts.forUser(key);
  if(!cart){
    cart = {
      userKey : key,
      created_at : new Date(),
      items : [],
      notes : [{
        note : "Cart created",
        created_at : new Date()
      }],
      status : "open",
      itemCount : 0,
      total : 0
    };
    Carts.insert(cart);
  }
  return cart;
};