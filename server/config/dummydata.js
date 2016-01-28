var db = require('../db/dbModel');
var path = require('path');
var momentModel = require('../moments/momentModel.js');
var storyModel = require('../stories/storyModel.js');


var dummyStoryData = [
  {"title": "my life", "description": "is amazing. i play dota all the time"},
  {"title": "me and my gf", "description": "my mom introduced us. sure, whatever"},
  {"title": "my family", "description": "the wu-tang clan"},
  {"title": "me and marley", "description": "my pet otter"},
  {"title": "me and suya", "description": "bruises everywhere"}
];

var dummyMomentData = [
  {"url": path.join(__dirname + '/../temp_storage/earthshaker.jpeg'), "caption": "earthshaker!!!!"},
  {"url": path.join(__dirname + '/../temp_storage/shadowfiend.jpeg'), "caption": "shadow friend"},
  {"url": path.join(__dirname + '/../temp_storage/arcwarden.jpeg'), "caption": "new guy"},
  {"url": path.join(__dirname + '/../temp_storage/tswift1.jpeg'), "caption": "happy 9th anniversary!"},
  {"url": path.join(__dirname + '/../temp_storage/tswift2.jpeg'), "caption": "nice hair dude"},
  {"url": path.join(__dirname + '/../temp_storage/tswift3.jpeg'), "caption": "surprised bae at work"},
  {"url": path.join(__dirname + '/../temp_storage/banks1.jpeg'), "caption": "say no more, fam"},
  {"url": path.join(__dirname + '/../temp_storage/banks2.jpeg'), "caption": "find the rapper"},
  {"url": path.join(__dirname + '/../temp_storage/banks3.jpeg'), "caption": "jeffrey dont smile"},
  {"url": path.join(__dirname + '/../temp_storage/mongoose.jpeg'), "caption": "what is these animals"},
  {"url": path.join(__dirname + '/../temp_storage/mongoose2.jpeg'), "caption": "mongo"},
  {"url": path.join(__dirname + '/../temp_storage/beaver.jpeg'), "caption": "#throwbackthursday"},
  {"url": path.join(__dirname + '/../temp_storage/afraid.jpeg'), "caption": "of suya"},
  {"url": path.join(__dirname + '/../temp_storage/dinosaur.jpeg'), "caption": "suya half the time"},
  {"url": path.join(__dirname + '/../temp_storage/boulder.jpeg'), "caption": "suya the other half of the time"}
];

module.exports = function () {
  console.log("trying to add stories");
  for (var i = 0; i < dummyStoryData.length; i++) {
    var story = dummyStoryData[i];
    storyModel.add(story)
      .then(function (result) {
        console.log('Story seeded');
      })
      .catch(function (error) {
        console.log('Story seed failed');
      });
  };

  for (var i = 0; i < dummyMomentData.length; i++) {
    var moment = dummyMomentData[i];
    momentModel.add(moment)
      .then(function (result) {
        console.log('Moment seeded');
      })
      .catch(function (error) {
        console.log('Moment seed failed');
      });
  };
};
