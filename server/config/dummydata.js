var db = require('../db/dbModel');
var path = require('path');
var stories = require('../db/dbModel').Story;
var moments = require('../db/dbModel').Moment;
var users = require('../db/dbModel').User;
var users_stories = require('../db/dbModel').Users_Stories;
var model = require('../models');

//will need to change once we have oauth
var dummyUserData = [
  {"first_name": "Suya", "last_name": "X", "email": "Suya@Suya.com", "token": "token", "password":"pw"},
  {"first_name": "Alex", "last_name": "W", "email": "Alex@Alex.com", "token": "token", "password":"pw"},
  {"first_name": "Julien", "last_name": "X", "email": "Julien@Julien.com", "token": "token", "password":"pw"},
  {"first_name": "Akash", "last_name": "X", "email": "Akash@Akash.com", "token": "token", "password":"pw"}
];

var dummyStoryOwnerUserId = 2; 

var dummyStoryData = [
  {"title": "my life", "description": "is amazing. i play dota all the time", "existingUsersToInclude": []},
  {"title": "me and my gf", "description": "my mom introduced us. sure, whatever", "existingUsersToInclude": [3]},
  {"title": "my family", "description": "the wu-tang clan", "existingUsersToInclude": [1,3,4]},
  {"title": "me and marley", "description": "my pet otter", "existingUsersToInclude": [1,3]},
  {"title": "me and suya", "description": "bruises everywhere", "existingUsersToInclude": [1]}
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
  return users.bulkCreate(dummyUserData)
    .then(function(){
      for(var i = 1; i <=dummyStoryData.length; i++){
        var allCharacters = [dummyStoryOwnerUserId].concat(dummyStoryData[i-1]["existingUsersToInclude"]);
        var storyData = {
          title: dummyStoryData[i-1]["title"],
          description: dummyStoryData[i-1]["description"], 
          existingUsersToInclude: allCharacters
        };
        model.stories.add(storyData);
      }
    })
    .then(function(){
      return moments.bulkCreate(dummyMomentData);
    })
    .catch(function(err){
      console.error("Error at seeding: ", err);
    })
};
