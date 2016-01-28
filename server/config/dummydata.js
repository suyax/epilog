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
  {"url": path.join(__dirname + '/../images/earthshaker.jpeg'), "caption": "earthshaker!!!!", "storyid": 1},
  {"url": path.join(__dirname + '/../images/shadowfiend.jpeg'), "caption": "shadow friend", "storyid": 1},
  {"url": path.join(__dirname + '/../images/arcwarden.jpeg'), "caption": "new guy", "storyid": 1},
  {"url": path.join(__dirname + '/../images/tswift1.jpeg'), "caption": "happy 9th anniversary!", "storyid": 2},
  {"url": path.join(__dirname + '/../images/tswift2.jpeg'), "caption": "nice hair dude", "storyid": 2},
  {"url": path.join(__dirname + '/../images/tswift3.jpeg'), "caption": "surprised bae at work", "storyid": 2},
  {"url": path.join(__dirname + '/../images/banks1.jpeg'), "caption": "say no more, fam", "storyid": 3},
  {"url": path.join(__dirname + '/../images/banks2.jpeg'), "caption": "find the rapper", "storyid": 3},
  {"url": path.join(__dirname + '/../images/banks3.jpeg'), "caption": "jeffrey dont smile", "storyid": 3},
  {"url": path.join(__dirname + '/../images/mongoose.jpeg'), "caption": "what is these animals", "storyid": 4},
  {"url": path.join(__dirname + '/../images/mongoose2.jpeg'), "caption": "mongo", "storyid": 4},
  {"url": path.join(__dirname + '/../images/beaver.jpeg'), "caption": "#throwbackthursday", "storyid": 4},
  {"url": path.join(__dirname + '/../images/afraid.jpeg'), "caption": "of suya", "storyid": 5},
  {"url": path.join(__dirname + '/../images/dinosaur.jpeg'), "caption": "suya half the time", "storyid": 5},
  {"url": path.join(__dirname + '/../images/boulder.jpeg'), "caption": "suya the other half of the time", "storyid": 5}
];

module.exports = function () {
  console.log("trying to add stories");
  console.log("Database Instance: ", db);
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
