(function (data) {
    var database = require('./database.js');

    // PATIENT
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

                db.patients.insert(fullPatient, next);
            }
        })
    }

    // USER
    data.getUser = function (userinfo, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.users.findOne({ email: userinfo.email }, next);
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