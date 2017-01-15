(function (homeController) {
    var data = require("../data");

    //This controller is a container for the different request types that are going to happen for the home part of the web page
    homeController.init = function (app) {
        // HOME
        app.get('/', function (req, res) {
            //check if signed in
            console.log(req.session.user);
            if (req.session.user != undefined && req.session.user != null) {
                res.render('index', { title: 'Linkwatch Demo ' + req.session.user, message: 'Hej, du är redan inloggad', issignedin: true });
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

        app.post('/signin', function (req, res) {
            console.log(req.body);
            data.getUser(req.body, function (err, user) {
                if (err) {
                    res.render('signin', { title: 'Logga in', message: 'Email eller lösenord stämmer inte', error: true, issignedin: false });
                }
                else {
                    // Save user session
                    console.log(user);
                    req.session.user = user.email;
                    res.render('index', { title: 'Linkwatch Demo' + user.name, message: 'Välkommen, du är nu inloggad!', issignedin: true });
                }
            })
        });

        // ADD PLAN
        app.get('/addplan', function (req, res) {
            res.render('addplan', { title: 'Ny Vårdplanering' }); 
        });

        app.post('/addplan', function (req, res) {
            console.log(req.body);
            data.addPatient(req.body, function (err) {
                if (err) {
                    res.render('addplan', { title: 'Ny Vårdplanering', message: 'Planen sparades inte!', error: true });
                }
                else {
                    res.render('addplan', { title: 'Ny Vårdplanering', message: 'Planen sparades!', error: false });
                }
            });
        })
    };

}(module.exports));