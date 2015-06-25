Meteor.startup(function(){

  var Repo = function(){
    var Massive = Meteor.npmRequire("massive");
    var connected = Async.runSync(function(done){
      Massive.connect(Meteor.settings.salesDB, done);
    });

    db = connected.result;
    console.log("The DB is : ", db);
    this.saveCheckout = function(checkout){
      var saved = Async.runSync(function(done){
        db.checkouts.save(checkout, function(err,res){
          if(err){
            console.log(err);
            done(null,{success : false, message : err});
          }else{
            done(null,{success : true, message : "Thank you for your purchase!", receipt_id : checkout.reference_key});
          }
        });
      });
      return saved.result;
    };

    this.getReceipt = function(reference_key){
      var receiptLookup = Async.runSync(function(done){
        db.checkouts.findOne({reference_key : reference_key}, function(err,result){
          if(err){
            done(err,result);
          }else{
            done(null,result);
          }
        });
      });
      console.log("returning now", receiptLookup.result.id);
      return receiptLookup.result;
    };

    this.removeCheckout = function(reference_key){
      var removed = Async.runSync(function(done){
        db.checkouts.destroy({reference_key : reference_key}, done);
      });
      return removed.result;
    };

  };
  SalesRepo = new Repo();
});