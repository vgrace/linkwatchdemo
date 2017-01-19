(function (homeController) {
    var data = require("../data");
    var careplan = require("../data/careplan"); 

    //This controller is a container for the different request types that are going to happen for the home part of the web page
    homeController.init = function (app) {
        // HOME
        app.get('/', function (req, res) {
            //check if signed in
            console.log(req.session.user);
            if (req.session.user != undefined && req.session.user != null) {
                //res.render('index', { title: 'Linkwatch Demo ' + req.session.user, message: 'Hej, du är redan inloggad', issignedin: true });
                 
                res.redirect('/patients'); 
            }
            else {
                res.render('signin', { title: 'Logga in', message: 'Hej!' });
            }
        });

        // REGISTER
        app.get('/register', function (req, res) {
            res.render('register', { title: 'Registrera', message: 'Hej!' });
        });

        app.post('/register', function (req, res) {
            console.log(req.body);
            //res.send('Hello handsome');
            data.addUser(req.body, function (err) {
                if (err) {
                    res.render('register', { title: 'Register', message: 'Something went wrong with the registration!', error: true });
                }
                else {
                    res.render('register', { title: 'Register', message: 'Your registration was successful!', error: false });
                }
            });
            //res.render('index', {title: 'Show users', message: 'All users'})
        });

        // SIGNIN
        app.get('/signin', function (req, res) {
            res.render('signin', { title: 'Logga in', message: 'Hej!' });
        });
        app.get('/signout', function (req, res) {
            req.session.user = null;
            console.log("Signout!"); 
            res.render('signin', { title: 'Logga in', message: 'Hej!' });
        });

        app.post('/signin', function (req, res) {
            console.log(req.body);
            data.getUser(req.body, function (err, user) {
                if (err) {
                    res.render('signin', { title: 'Logga in', message: 'Email eller lösenord stämmer inte ' + err, error: true, issignedin: false });
                }
                else {
                    // Save user session
                    console.log("The user");
                    console.log(user);
                    req.session.user = user.email;
                    res.redirect('/patients');

                    //res.render('index', { title: 'Linkwatch Demo' + user.name, message: 'Välkommen, du är nu inloggad!', issignedin: true });
                   
                }
            })
        });

        // ADD PLAN
        app.get('/addplan', function (req, res) {
            console.log(careplan.jsondata.CarePlan.activities.activity[1].when["@period"]);
            res.render('addplan', { title: 'Ny Vårdplanering', issignedin: true }); 
        });

        app.post('/addplan', function (req, res) {
            console.log(req.body);
            data.addPatient(req.body, function (err, patient) {
                if (err) {
                    res.render('addplan', { title: 'Ny Vårdplanering', message: 'Planen sparades inte!', error: true, issignedin: true });
                }
                else {
                    console.log(patient);
                    console.log("------------------------------- patient");
                    res.render('addplan', { title: 'Ny Vårdplanering', message: 'Planen sparades!', error: false, patient:patient, issignedin: true });
                }
            });
        });

        app.post('/updateplan', function (req, res) {
            //console.log(req.body);
            //res.send(req.body);
            
            data.updatePatient(req.body, function (err, oldPatient) {
                if (err) {
                    console.log("error updating plan"); 
                    res.render('patient', { title: 'Patient: ' + req.body.name + " " + req.body.lastname, message: 'Uppdateringen misslyckades', issignedin: true, patient: null, error: true });
                }
                else {
                    if (oldPatient != null) {
                        console.log("Update ok");
                        console.log(oldPatient);
                        console.log("---------------------------------");
                        data.getPatient(oldPatient.fulname, function (err, newPatient) {
                            if (err) {
                                console.log("Fel vid hämtning av Updated patient!");
                                res.render('patient', { title: 'Patient: ' + oldPatient.name + " " + oldPatient.lastname, message: 'Vårdplanen uppdaterades, men det var problem med att hämta den uppdaterade vårdplanen', issignedin: true, patient: null, error: true });
                            }
                            else {
                                console.log("Updated patient!");
                                res.render('patient', { title: 'Patient: ' + newPatient.name + " " + newPatient.lastname, message: 'Vårdplanen uppdaterades', issignedin: true, patient: newPatient, error: false });
                            }
                        }); 
                    }
                    else {
                        console.log("Updated patient is null");
                        res.render('patient', { title: 'Patient: ' + req.body.name + " " + req.body.lastname, message: 'Patienten hittades inte', issignedin: true, patient: null, error: true });
                    }
                }
            });
        });

        // GET PLAN JSON
        app.get('/patient/:userfullname/careplan', function (req, res) {
            
            //res.send(req.params.userfullname);

            data.getPatient(req.params.userfullname, function (err, patient) {
                if (err) {
                    res.send("Patienten hittades inte");
                }
                else {
                    console.log(patient)
                    //res.send(patient);
                    if (patient != null) {
                        // Activity steps
                        careplan.jsondata.CarePlan.activities.activity[0].stepsRange.min = patient.dailyactivity + "";
                        careplan.jsondata.CarePlan.activities.activity[0].description = "Walk " + patient.dailyactivity + " steps per day"; 

                        // Bloodpresssure
                        careplan.jsondata.CarePlan.activities.activity[1].when["@period"] = patient.dailybloodpressuretake; //Math.round( (1440 / parseInt(patient.dailybloodpressuretake)) / 60) + "";
                        careplan.jsondata.CarePlan.activities.activity[1].when["@periodUnits"] = "day";

                        //Medicin
                        if (patient.dailymedicinname != null) {
                            careplan.jsondata.CarePlan.activities.activity[2].when["@period"] = patient.dailymedicinamount;
                            careplan.jsondata.CarePlan.activities.activity[2].when.text = patient.dailymedicinname; 
                        }
                        
                        res.send(careplan);
                    }
                    else {
                        res.send("Patient hittades inte"); 
                    }
                }
            }); 
        });

        // PATIENTS
        app.get('/patients', function (req, res) {
            data.getAllPatients(function (err, patients) {
                if (err) {
                    console.log("error getting patients: " + err);
                    res.render('patients', { title: 'Patienter', message: 'Ett fel inträffade vid hämtning av patienter', issignedin: true, patients: null, error: true });
                }
                else {
                    res.render('patients', { title: 'Patienter', message: '', issignedin: true, patients: patients });
                }
            });
        });

        app.get('/patient/:fullname', function (req, res) {
            data.getPatient(req.params.fullname, function (err, patient) {
                if (err) {
                    res.send("Patienten hittades inte");
                }
                else {
                    if(patient != null){
                        console.log(patient)
                        res.render('patient', { title: 'Patient: ' + patient.name + " " + patient.lastname, message: '', issignedin: true, patient: patient });
                    }
                    else{
                        res.render('patient', { title: 'Patient: hittades inte', message: '', issignedin: true, patient: '' });
                    }
                }
            }); 
        }); 

    };

}(module.exports));