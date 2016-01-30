//define requirements
var dummy = require('./config/dummydata.js');
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./db/dbModel');


//create instance of express server
var app = express();

//set up middleware
app.use(bodyParser.urlencoded({limit: '1gb', extended: true}));
app.use(bodyParser.json());
//serve up static files upon initialization of server
app.use(express.static(path.join(__dirname, "/client")));

//Oauth server stuff
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
require('./auth/auth');

//listen on routes   
require('./config/routes.js')(app);

//set up port for server
var port = process.env.PORT || 3000;

//set server to list on port specified above
app.listen(port, function(){
 console.log('Server listening on port ' + port);
});  

//create database
db.init();

setTimeout(dummy, 3000);
//export server
module.exports = app;
