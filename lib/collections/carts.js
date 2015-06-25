Carts = new Mongo.Collection("carts");

Carts.getCart = function(userKey){

  var cart = Carts.findOne({userKey : userKey});
  if(!cart){
    cart = {
      userKey : userKey,
      email : null,
      name :null,
      ip : null,
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

  }
  return cart;
};