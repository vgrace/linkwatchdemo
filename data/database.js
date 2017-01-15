(function (database) {
    var mongodb = require('mongodb');
    var mongourl = "mongodb://admin:admin123456789@ds163758.mlab.com:63758/linkwatch"//"mongodb://vgrace:Traits_api2016@ds053126.mlab.com:53126/traitsdb";//
    var theDb = null;

    database.getDb = function (next) {
        if (!theDb) {
            //connect to the db
            mongodb.MongoClient.connect(mongourl, function (err, db) {
                if (err) {
                    next(err, null);//call the callback func with the error, db = null
                }
                else {
                    theDb = {
                        db: db,
                        users: db.collection("users"),
                        patients: db.collection("patients")
                    }
                    next(null, theDb); //return null error and the db-object
                }
            });
        }
        else {
            next(null, theDb); //no error, a connection is open and return db
        }
    }
    
}(module.exports));