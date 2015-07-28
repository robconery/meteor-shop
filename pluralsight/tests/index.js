var Massive = require("massive");

var db = Massive.connectSync({db : "massive"});

console.log(db)