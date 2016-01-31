//define requirements
var dummy = require('./config/dummydata.js');
var express = require('express');
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

//seeds dummy data; comment out when testing!
setTimeout(dummy, 3000);
//export server
module.exports = app;
