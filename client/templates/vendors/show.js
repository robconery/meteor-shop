Template.vendorsShow.helpers({
  products : function(){
    return Products.find({"vendor.id" : this.id});
  }
});