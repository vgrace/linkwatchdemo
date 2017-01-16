(function (data) {
    var database = require('./database.js');

    // PATIENT

    data.getAllPatients = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.patients.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    }
                    else {
                        next(null, results);
                    }
                });
            }
        }); 
    }

    data.getPatient = function (patientFullName, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.patients.findOne({ fulname: patientFullName.toUpperCase() }, next);
            }
        });
    }

    data.addPatient = function (patientInfo, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                var fullPatient = {
                    name: patientInfo.name,
                    lastname: patientInfo.lastname,
                    fulname: patientInfo.name.toUpperCase() + patientInfo.lastname.toUpperCase(),
                    personnumber: patientInfo.personnumber,
                    dailyactivity: patientInfo.dailyactivity,
                    dailybloodpressuretake: patientInfo.dailybloodpressuretake
                };

                db.patients.insert(fullPatient, function (err, patient) {
                    if (err) {
                        next(err, null);
                    }
                    else {
                        next(null, patient.ops[0]); 
                    }
                });
            }
        }); 
    }

    data.updatePatient = function (patientUpdates, next) {
        console.log(patientUpdates);
        console.log("------- IN UPDATE PATIENT"); 
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.patients.findOneAndUpdate(
                    { "fulname": patientUpdates.fullname },
                    {
                        $set: {
                            "name": patientUpdates.name,
                            "lastname": patientUpdates.lastname,
                            "personnumber": patientUpdates.personnumber,
                            "dailyactivity": patientUpdates.dailyactivity,
                            "dailybloodpressuretake": patientUpdates.dailybloodpressuretake
                        },
                        
                    }, function (err, updatedPatient) {
                        if (err) {
                            next(err, null);
                        }
                        else {
                            next(null, updatedPatient.value); 
                        }
                    }
                );
            }
        }); 
    }

    // USER
    data.getUser = function (userinfo, next) {
        console.log("IN GET USER"); 
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.users.findOne({ email: userinfo.email }, function (err, user) {
                    if (err) {
                        console.log("Error getting user");
                        next(err, null);
                    }
                    else {
                        console.log("User was found!");
                        console.log(user);
                        next(null, user);
                    }
                });
            }
        });
    }

    data.addUser = function (userinfo, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                var fullUser = {
                    email: userinfo.email,
                    name: userinfo.name,
                    lastname: userinfo.lastname,
                    personnumber: userinfo.personnumber,
                    password: userinfo.password
                };

                db.users.insert(fullUser, next);
            }
        });
    }
}(module.exports))