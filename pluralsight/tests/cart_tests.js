if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe('Shopping Cart: Server Methods', function () {
      describe("A New Cart", function () {
        var result = null;
        before(function(){
          result = Meteor.call("getCart", "test");
        });
        after(function(){
          Carts.remove({});
        });
        it("has a unique key", function(){
          chai.assert.equal(result.userKey, "test");
        });
        it("has a total", function(){
          chai.assert.equal(result.total, 0);
        });
        it("has an item count", function(){
          chai.assert.equal(result.itemCount, 0);
        });
        it("has an item list", function(){
          chai.assert(result.items);
        });
        it("has a user key", function(){
          chai.assert(result.userKey);
        });
        it("has a status defaulted to open", function(){
          chai.assert.equal(result.status, "open");
        });
        it("tracks the event", function(){
          chai.assert.equal(1, result.notes.length);
        });
      });
      describe("Adding an item", function () {
        var result = null;
        before(function(){
          result = Meteor.call("addToCart", "test", "honeymoon-mars");
        });
        after(function(){
          Carts.remove({});
        });
        it("adds the item to the list", function(){
          chai.assert.equal(1, result.items.length);
        });
        it("defaults quantity to 1 when not specified", function(){
          chai.assert.equal(1, result.items[0].quantity);
        });
        it("sets an added date", function(){
          chai.assert(result.items[0].added_at);
        });
        it("sets sku, name, price, discount, summary, image", function(){
          var item = result.items[0];
          chai.assert(item.sku);
          chai.assert(item.name);
          chai.assert(item.price);
          chai.assert.equal(0, item.discount);
          chai.assert(item.description);
          chai.assert(item.image);
        });
        it("defaults discount to 0", function(){
          chai.assert.equal(0, result.items[0].discount);
        });
        it("tracks the event", function(){
          chai.assert.equal(2, result.notes.length);
        });
      });

      describe("Adding an item already added", function () {
        var result = null;
        before(function(){
          Meteor.call("addToCart", "test", "honeymoon-mars");
          result = Meteor.call("addToCart", "test", "honeymoon-mars");
        });
        after(function(){
          Carts.remove({});
        });
        it("increments the quantity of the item", function(){
          chai.assert.equal(2, result.items[0].quantity);
        });
        it("tracks the event for the customer", function(){
          chai.assert.equal(3, result.notes.length);
        });
      });
      describe("Removing an item", function () {
        var result = null;
        before(function(){
          Meteor.call("addToCart", "test", "honeymoon-mars");
          result = Meteor.call("removeFromCart", "test", "honeymoon-mars");
        });
        after(function(){
          Carts.remove({});
        });
        it("removes the item from the list", function(){
          chai.assert.equal(0, result.items.length);
        });
        it("tracks the event", function(){
          chai.assert.equal(3, result.notes.length);
        });
      });
    });
  });
}
