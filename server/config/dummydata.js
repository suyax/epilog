var db = require('../db/dbModel');
var path = require('path');
var stories = require('../db/dbModel').Story;
var moments = require('../db/dbModel').Moment;
var users = require('../db/dbModel').User;
var users_stories = require('../db/dbModel').Users_Stories;
var tags = require('../db/dbModel').Tag;
var model = require('../models');
var Promise = require('bluebird');

var SERVER_URL = require('../config.js').SERVER_URL;

//will need to change once we have oauth
var dummyUserData = [
  {"firstName": "Suya", "lastName": "X", "email": "Suya@Suya.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
  {"firstName": "Alex", "lastName": "W", "email": "Alex@Alex.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
  {"firstName": "Julien", "lastName": "X", "email": "J", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
  {"firstName": "Akash", "lastName": "X", "email": "Akash@Akash.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"}
];

var dummyStoryOwnerUserId = 2; 

var dummyStoryData = [
  {"title": "my life", "description": "is amazing. i play dota all the time", "existingUsersToInclude": []},
  {"title": "me and my gf", "description": "my mom introduced us. sure, whatever", "existingUsersToInclude": [3]},
  {"title": "my family", "description": "the wu-tang clan", "existingUsersToInclude": [1,3,4]},
  {"title": "me and marley", "description": "my pet otter", "existingUsersToInclude": [1,3]},
  {"title": "me and suya", "description": "BFFs", "existingUsersToInclude": [1]}
];

var dummyTagData = [
  {'momentId': 1, 'tags': ['First']},
  {'momentId': 2, 'tags': ['second']},
  {'momentId': 3, 'tags': ['third']},
  {'momentId': 4, 'tags': ['fourth']},
  {'momentId': 5, 'tags': ['fifth']},
  {'momentId': 6, 'tags': ['sixth']},
];

var dummyMomentData = [
  {"url": SERVER_URL + '/earthshaker.jpeg', updatedAt: 1454162911254,
    "caption": "earthshaker!!!!", "userid": 1, "storyid": 3},
  {"url": SERVER_URL + '/shadowfiend.jpeg', updatedAt: 1454262911254,
    "caption": "shadow friend", "userid": 2,  "storyid": 1},
  {"url": SERVER_URL + '/arcwarden.jpeg', updatedAt: 1454362911254,
    "caption": "new guy", "userid": 2, "storyid": 4},
  {"url": SERVER_URL + '/tswift1.jpeg', updatedAt: 1454462911254,
    "caption": "happy 9th anniversary!", "userid": 3, "storyid": 4},
  {"url": SERVER_URL + '/tswift2.jpeg', updatedAt: 1454562911254,
    "caption": "nice hair dude", "userid": 1, "storyid": 4},
  {"url": SERVER_URL + '/tswift3.jpeg', updatedAt: 1454662911254,
    "caption": "surprised bae at work", "userid": 4, "storyid": 3},
  {"url": SERVER_URL + '/banks1.jpeg', updatedAt: 1454762911254,
    "caption": "say no more, fam", "userid": 4, "storyid": 3},
  {"url": SERVER_URL + '/banks2.jpeg', updatedAt: 1454862911254,
     "caption": "find the rapper", "userid": 3, "storyid": 4},
  {"url": SERVER_URL + '/banks3.jpeg', updatedAt: 1454962911254,
     "caption": "jeffrey dont smile", "userid": 2, "storyid": 3},
  {"url": SERVER_URL + '/mongoose.jpeg', updatedAt: 1455062911254,
     "caption": "what is these animals", "userid": 1,  "storyid": 4},
  {"url": SERVER_URL + '/mongoose2.jpeg', updatedAt: 1455162911254,
     "caption": "mongo", "userid": 2,  "storyid": 2},
  {"url": SERVER_URL + '/beaver.jpeg', updatedAt: 1455262911254,
     "caption": "#throwbackthursday", "userid": 1, "storyid": 3},
  // {"url": path.join(__dirname + '/../images/afraid.jpeg'),
  //    "caption": "of suya", "userid": 3, "storyid": 2},
  // {"url": path.join(__dirname + '/../images/dinosaur.jpeg'),
  //    "caption": "suya half the time", "userid": 4, "storyid": 3},
  // {"url": path.join(__dirname + '/../images/boulder.jpeg'),
  //    "caption": "suya the other half of the time", "userid": 3,"storyid": 3}
];

module.exports = function () {
  return db.init()
  .then(function (){
  //start by creating users 
    return users.bulkCreate(dummyUserData)
    //then seed stories + users_stories table
    .then(function(){
      // use Promise.each to wait for async add
      return Promise.each(dummyStoryData, function(dumbStory){
        //for each story object, modify the added characters to include the story owner
        var allCharacters = [dummyStoryOwnerUserId].concat(dumbStory["existingUsersToInclude"]);
        //create a story object 
        var storyData = {
          title: dumbStory["title"],
          description: dumbStory["description"], 
          existingUsersToInclude: allCharacters
        };
        //pass story object into the storyModel.js add method
        return model.stories.add(storyData);
      });
    })
    //once users and stories are accounted for, seed moments
    .then(function(){
      // use Promise.each to wait for async add
      return Promise.each(dummyMomentData, function(dumbMoment){
        var momentInfo = {
          userid: dumbMoment["userid"],
          url: dumbMoment["url"],
          caption: dumbMoment["caption"],
          storyid: dumbMoment["storyid"],
          newCharacters: [],
          updatedAt: dumbMoment["updatedAt"],
        };
        return model.moments.add(momentInfo);
      });
    })
    // create tags
    .then(function(){
      return Promise.each(dummyTagData, function(dumbTag){
        return model.tags.add(dumbTag);
      })
    })
    //account for errors
    .catch(function(err){
      console.log("Error at seeding: ", err);
    })
  });
};
