receiptData = new Blaze.ReactiveVar();
Template.receiptShow.helpers({
  receipt : function(){
    return receiptData.get();
  }
});

Template.receiptShow.onRendered(function(){
  console.log(this.data.id);
  getReceipt(this.data.id, function(err,res){
    receiptData.set(res);
  });

});