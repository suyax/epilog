var fs = require('fs');
var path = require('path');
var images = '/../images';
var Promise = require('bluebird');
var momentModel = require('./momentModel');
var Busboy = require('busboy');
var SERVER_URL = require('../config.js').SERVER_URL;

module.exports =  {

  //// Controller method for adding a moment and saving the image
  //
  add: function (req, res) {
    // Moment information container for insertion
    var momentData = {};
    var newTags = JSON.parse(req.headers.tags);

    // Create a Busboy instance using the request headers
    var busboy = new Busboy({headers: req.headers});

    // Set busboy to listen for a file upload event
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

      // Create the URL for the photo, parse it for pertinent information
      var filepath = path.join(__dirname, images + '/' + filename);
      var parsedFileName = filename.split('_');

      // Fill the moment information container
      momentData['caption'] = parsedFileName[1].split('&*&').join(' ');
      momentData['storyid'] = Number(parsedFileName[2]);
      momentData['url'] = SERVER_URL + '/' + filename;
      momentData['userid'] = Number(parsedFileName[3]);

      if (parsedFileName.length === 6) {
        var newCharacters = parsedFileName[4].split(',');
        newCharacters.forEach(function (character) {
          character = Number(character);
        });

        momentData['newCharacters'] = newCharacters;
      }

      // Preserve binding to file inside fs.stat
      var fileData = file;
        
      // Check if the image file already exists
      fs.stat(filepath, function (err, file) {

        // If the image exists, respond with an error
        if (file && file.isFile()) {
          res.status(500).end('Image already exists.');
        } else {

          // Open a file stream
          var writeStream = fs.createWriteStream(
            filepath,
            {flags: 'ax'}
          );

          // Listen for the data from the file upload
          // Write the data to the file stream
          fileData.on('data', function(data) {
            writeStream.write(data);
          });

          // Insert the new moment into the database
          fileData.on('end', function() {
            momentModel.add(momentData)
              .then(function (results){
                results.tags = newTags;
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
    });

    // Pipe the request to the existing busboy instance to trigger
    // the file event
    req.pipe(busboy);
  },

  getOne: function(req, res) {
    var momentId = req.params.momentId;
    momentModel.getOne(momentId)
      .then(function (results) {
        res.status(200).json(results);
      })
      .catch(function (error) {
        res.status(404).json();
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
