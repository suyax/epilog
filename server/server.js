var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db/dbModel');
var request = require('request');


var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
   
require('./config/routes.js')(app);

app.use(express.static(path.join(__dirname, "/client")));

var port = process.env.PORT || 3000;

app.listen(port, function(){
 console.log('Server listening on port ' + port);
});  

module.exports = app;
