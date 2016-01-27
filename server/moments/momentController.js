var fs = require('fs');
var path = require('path');
var tempStorage = '/../temp_storage';
var Promise = require('bluebird');
var momentModel = require('./momentModel');

module.exports =  {

  addMoment: function (req, res){
    //Define Variables
    //filePath --> temp location in file tree where we will dump images
    var filePath = path.join(__dirname, tempStorage + "/" + Math.random()*10000 + ".jpeg");
    //momentData --> location within request object, where header information lives
    console.log(req.headers);
    var momentData = JSON.parse(req.headers.momentdata);
    //moment --> contains all of the pertinent information related to a moment inside of the header
    var moment = {
      url: filePath,
      caption: momentData.caption,
      storyid: momentData.storyid
    }
    //open a writestream on the filepath defined above
    var writeStream = fs.createWriteStream(
      filePath,
      {flags: 'ax', encoding: 'base64'}
    );

    //add each of the incoming data chunks from the client to the filepath specified above
    req.on('data', function(chunk){
      writeStream.write(chunk);
    });
    //once the data has been received, call the add method in the momentModel to input the moment 
    //data into the database
    req.on('end', function(){
      momentModel.add(moment)
        .then(function (results){
          res.status(201).json(results);
        })
        .catch(function (error){
          res.status(404).json();
        });
    })

    
    //add path to momentInfo before using the moment model to add the data
    //in momentInfo to the db

  },

  getAllMoments: function (req, res) {
    var storyId = req.params.storyId;
    momentModel.getAll(storyId)
      .then(function (results) {
        res.status(200).json(results);
      })
      .catch(function (error) {
        res.status(404).json();
      });
  }
};
