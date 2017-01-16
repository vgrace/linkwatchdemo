var express = require('express')
var app = express()
var http = require("http");
var controllers = require("./controllers");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require("connect-flash");
var bodyParser = require('body-parser')

//Setup the View engine
app.set("view engine", "jade");

//Opt into services
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'linkwatchdemo123456789',
    resave: true,
    saveUninitialized: true
}))
app.use(flash()); //requires express-session and cookie-parser

//set the public static resource folder (makes the public folder public and accessible from the browser)
app.use(express.static(__dirname + "/public"));

// make bower comps public
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//Map the routes
controllers.init(app);

module.exports = app;

//var server = http.createServer(app);

//server.listen(6262);// listen for webserver

//app.listen(6262, function () {
//    console.log('Example app listening on port 6262!')
//})