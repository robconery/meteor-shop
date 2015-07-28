if(Meteor.isClient){

  userKey = localStorage.getItem("user_key");
  if(!userKey){
    userKey = Meteor.uuid();
    localStorage.setItem("user_key", userKey);
  }

  getCart = function(next){
    Meteor.call("getCart", next);
  };

  addToCart = function (sku, callback) {
    Meteor.call('addToCart',userKey, sku, callback);
  };
  removeFromCart = function (sku, callback) {
    Meteor.call('removeFromCart',userKey, sku, callback);
  };
  saveCart = function (cart, callback) {
    Meteor.call('saveCart',userKey, cart, callback);
  };
}

if(Meteor.isServer){
  Meteor.methods({
    //getcart
    getCart : function(userKey){
      return Carts.getCart(userKey);
    },

    //addToCart
    addToCart : function(userKey, sku){
      var cart = Meteor.call("getCart", userKey);
      //get the item in the cart
      var found = _.find(cart.items, function(item){
        return item.sku === sku;
      });

      if(found){
        found.quantity++;
      }else{
        //add the item
        var product = Products.bySku(sku);
        var item = {
          sku : product.sku,
          name : product.name,
          price : product.price,
          description : product.summary,
          image : product.image,
          discount : 0,
          added_at : new Date(),
          quantity : 1
        };
        cart.items.push(item);

      }
      cart.notes.push({
        note : sku + " added to cart",
        created_at : new Date()
      });
      //save it
      Meteor.call("saveCart", cart);
      return cart;
    },
    //removeFromCart
    removeFromCart : function(userKey, sku){
      var cart = Meteor.call("getCart", userKey);
      //get the item in the cart

      var found = _.find(cart.items, function(item){
        return item.sku === sku;
      });

      if(found){
        var foundIndex = cart.items.indexOf(found);
        cart.items.splice(foundIndex,1);
        cart.notes.push({
          note : sku + " removed from cart",
          created_at : new Date()
        });
        Meteor.call("saveCart", cart);
      }

      return cart;
    },

    saveCart : function(cart){
      cart.updated_at = new Date();
      var counter = 0;
      _.each(cart.items, function(item){
        item.lineTotal = (item.price - item.discount) * item.quantity;
        cart.total+=item.lineTotal;
        counter++;
      });
      cart.itemCount = counter;
      Carts.update({userKey : cart.userKey}, cart, {upsert : true});
      return cart;
    },

    emptyCart : function(userKey){
      Carts.remove({userKey : userKey});
    }
  });
}