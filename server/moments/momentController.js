var fs = require('fs');
var path = require('path');
var images = '/../images';
var Promise = require('bluebird');
var momentModel = require('./momentModel');
var base64 = require('base64-stream');

module.exports =  {

  add: function (req, res){
    //Define Variables

    //momentData --> location within request object, where header information lives
    //NOTE: we decided to use headers to story the moment info as the actual req.body will contain an image
    var momentData = JSON.parse(req.headers['momentdata']);
    // console.log("req params -->", req.headers['momentdata']);
    
    //uniqueMomentIdentifier --> creates unique identifier for each moment based on data provided (NOTE: this is temporary);
    var uniqueMomentIdentifier = momentData.caption.split(" ").join("")+momentData.storyid;
    // console.log("uniqueMomentIdentifier -->", uniqueMomentIdentifier);

    //filePath --> temp location in file tree where we will dump images
    var filePath = path.join(__dirname, images + "/" + uniqueMomentIdentifier + ".png");

    //check to see if file path exists...
    fs.stat(filePath, function (err, file){
      //if filepath already exists, end response 
      if(file && file.isFile()){
        res.end('image already exists');
      }
      //otherwise...
      else {
        //define moment object that contains info related to moment
        var momentInfo = {
          userid: Number(req.user.id),
          url: filePath,
          caption: momentData.caption,
          storyid: momentData.storyid,
          newCharacters: momentData.newCharacters
        }
        //open up fileStream on filePath 
        var writeStream = fs.createWriteStream(
          filePath,
          {flags: 'ax'}
        );

        req.pipe(writeStream);

        req.on('end', function (){
          momentModel.add(momentInfo)
            .then(function (results){
              writeStream.end();
              res.status(201).json(results);
            })
            .catch(function (error){
              writeStream.end();
              res.status(404).json();
            });
        });
      }
    });
  },

  getAll: function (req, res) {
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
