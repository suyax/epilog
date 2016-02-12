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
  {"firstName": "Suya", "lastName": "Xu", "email": "s@s.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
  {"firstName": "Alex", "lastName": "Wu", "email": "aw@aw.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
  {"firstName": "Julien", "lastName": "Panopio", "email": "j@j.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
  {"firstName": "Akash", "lastName": "Trivedi", "email": "at@at.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
  {"firstName": "Raksha", "lastName": "Trivedi", "email": "r@r.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
  {"firstName": "Vandan", "lastName": "Trivedi", "email": "v@v.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
   {"firstName": "Ryan", "lastName": "Komori", "email": "ry@ry.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
   {"firstName": "Minka", "lastName": "Kelly", "email": "m@m.com", "token": "token", "password":"$2a$10$r28KBvvOL4UQaYMHGXReauMcg8u6tdXO4Xtb4F/EPobR8F3R8oVaa"},
];

var dummyStoryOwnerUserId = 4; 

var dummyStoryData = [
  {"title": "My path to clarity", "description": "A compilation of snapshots from my life", "existingUsersToInclude": [1,2,3]},
  {"title": "Home is where the heart is", "description": "Me, my mom, and my dad", "existingUsersToInclude": [5,6]},
  {"title": "Started from the bottom", "description": "The story of 4 friends who set out to become engineers", "existingUsersToInclude": [1,2,3]},
  {"title": "Saving Grace", "description": "Our daughter's journey to adulthood", "existingUsersToInclude": [1,2,3,7]},
  {"title": "2016 - A Love Story", "description": "It all started in the city by the Bay", "existingUsersToInclude": [8]}
];

var dummyTagData = [
  {'momentId': 1, 'tags': ['First']},
  {'momentId': 2, 'tags': ['second']},
  {'momentId': 3, 'tags': ['third']},
  {'momentId': 4, 'tags': ['fourth']},
  {'momentId': 5, 'tags': ['fifth']},
  {'momentId': 6, 'tags': ['sixth']},
  {'momentId': 7, 'tags': ['sixth']},
  {'momentId': 8, 'tags': ['sixth']},
  {'momentId': 9, 'tags': ['sixth']},
  {'momentId': 10, 'tags': ['sixth']},
  {'momentId': 11, 'tags': ['sixth']},
  {'momentId': 12, 'tags': ['sixth']},
  {'momentId': 13, 'tags': ['sixth']},
  {'momentId': 14, 'tags': ['sixth']},
];

var dummyMomentData = [
  {"url": SERVER_URL + '/blog - artislove.jpg', updatedAt: Date.parse(new Date(2014, 11, 17, 3, 24, 0)),
    "caption": "Blown away by the power of this piece.", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - deaths.jpg', updatedAt: Date.parse(new Date(2014, 11, 17, 4, 24, 0)),
    "caption": "So moved by the tragic images of genocide", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - endofanera.jpg', updatedAt: Date.parse(new Date(2015, 3, 05, 1, 24, 0)),
    "caption": "We have come from far. We are going far", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - friends.jpg', updatedAt: Date.parse(new Date(2015, 07, 10, 3, 24, 0)),
      "caption": "Need to appreciate how blessed I am.", "userid": 1, "storyid": 1}, 
  {"url": SERVER_URL + '/blog - friendsss.jpg', updatedAt: Date.parse(new Date(2015, 07, 10, 5, 10, 0)),
    "caption": "Grateful to have such amazing people in my life", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - genocide.jpg', updatedAt: Date.parse(new Date(2015, 11, 17, 2, 24, 0)),
    "caption": "Standing at the burial site of 250K, many of whom were children", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - happyplace.jpg', updatedAt: Date.parse(new Date(2016, 01, 5, 3, 24, 0)),
    "caption": "Not religious but damn does nature make me feel spiritual", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - humanityofanimals.jpg', updatedAt: Date.parse(new Date(2015, 04, 2, 3, 24, 0)),
    "caption": "Such humanity and beauty in all living things", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - itsaboutthejourney.jpg', updatedAt: Date.parse(new Date(2013, 06, 21, 3, 24, 0)),
    "caption": "Thinking about the journey ahead", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - kenya.jpg', updatedAt: Date.parse(new Date(2011, 10, 28, 3, 24, 0)),
    "caption": "Never have I felt more welcome in a place", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - lovebuilding.jpg', updatedAt: Date.parse(new Date(2014, 08, 19, 3, 24, 0)),
    "caption": "Finally realized what makes me happy: building", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - lovekids.jpg', updatedAt: Date.parse(new Date(2012, 11, 2, 3, 24, 0)),
    "caption": "Hope I never lose my childlike curiosity", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - perseverence.jpg', updatedAt: Date.parse(new Date(2011, 10, 22, 3, 24, 0)),
    "caption": "Inspiration", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - poverty2.jpg', updatedAt: Date.parse(new Date(2013, 05, 30, 3, 24, 0)),
    "caption": "Feel overwhelmed and inspired", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - poverty.jpg', updatedAt: Date.parse(new Date(2013, 05, 29, 3, 24, 0)),
    "caption": "Inspired by the strength of people", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - powerfulexhibit.jpg', updatedAt: Date.parse(new Date(2014, 11, 17, 1, 24, 0)),
    "caption": "Moved to tears", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - rwanda.jpg', updatedAt: Date.parse(new Date(2014, 11, 21, 3, 24, 0)),
    "caption": "One of the most beautiful places Ive ever been", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - seattle.jpg', updatedAt: Date.parse(new Date(2016, 11, 15, 3, 24, 0)),
    "caption": "10k miles from home", "userid": 1, "storyid": 1},
  {"url": SERVER_URL + '/blog - surreal.jpg', updatedAt: Date.parse(new Date(2012, 04, 12, 3, 24, 0)),
    "caption": "I wonder I didnt smile", "userid": 1, "storyid": 1}, 

  {"url": SERVER_URL + '/grace - bestfriends.jpg', updatedAt: Date.parse(new Date(2015, 10, 28, 3, 24, 0)),
    "caption": "Grace meeting my best frineds from college", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - birthday.jpg', updatedAt: Date.parse(new Date(2015, 09, 12, 3, 24, 0)),
  "caption": "Welcome to the world little one", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - dadandgrace.jpg', updatedAt: Date.parse(new Date(2015, 09, 20, 3, 24, 0)),
  "caption": "I've never felt so much responsibility", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - daddydate.jpg', updatedAt: Date.parse(new Date(2015, 09, 22, 3, 24, 0)),
  "caption": "Having you changed my life", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - daddysgirl.jpg', updatedAt: Date.parse(new Date(2015, 10, 15, 3, 24, 0)),
  "caption": "You better be this sweet when you grow up", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - damnyoudidntreallylikeme.jpg', updatedAt: Date.parse(new Date(2015, 09, 15, 3, 24, 0)),
  "caption": "Ugh. Seeing you cry is the toughest", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - grandma2.jpg', updatedAt: Date.parse(new Date(2016, 01, 05, 3, 24, 0)),
"caption": "Meeting grandma!", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - lookatthathair.jpg', updatedAt: Date.parse(new Date(2016, 02, 10, 3, 24, 0)),
"caption": "Haha, I kind of want to color your hair blue", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - momandgrace.jpg', updatedAt: Date.parse(new Date(2015, 12, 20, 3, 24, 0)),
"caption": "You're always so happy with mom!", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - notinterestedingifts.jpg', updatedAt: Date.parse(new Date(2015, 12, 25, 3, 24, 0)),
"caption": "If you don't want these I'll take them!", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - unclejeff.jpg', updatedAt: Date.parse(new Date(2015, 01, 3, 3, 24, 0)),
"caption": "Sometimes I think you like uncle jeff more than me", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - yourfirstoutfit.jpg', updatedAt: Date.parse(new Date(2015, 09, 21, 3, 24, 0)),
"caption": "Mwahahaha, get ready for a lot of animal onsies!", "userid": 1,"storyid": 4}, 
  {"url": SERVER_URL + '/grace - grandma.jpg', updatedAt: Date.parse(new Date(2015, 09, 12, 3, 24, 0)),
"caption": "3 generations", "userid": 1,"storyid": 4}, 

  {"url": SERVER_URL + '/lovestory - bffs.jpg', updatedAt: Date.parse(new Date(2015, 03, 8, 3, 24, 0)),
"caption": "So grateful to spend time with my best friend", "userid": 1, "storyid": 5}, 
  {"url": SERVER_URL + '/lovestory - firstdate.jpg', updatedAt: Date.parse(new Date(2014, 01, 31, 3, 24, 0)),
"caption": "Best date I ever went on", "userid": 1, "storyid": 5}, 
  {"url": SERVER_URL + '/lovestory - stillgoingstrong.jpg', updatedAt: Date.parse(new Date(2016, 01, 31, 3, 24, 0)),
"caption": "2 year anniversary. Still feels like we met yesterday", "userid": 1, "storyid": 5}, 
  {"url": SERVER_URL + '/lovestory - umm.jpg', updatedAt: Date.parse(new Date(2016, 01, 15, 3, 24, 0)),
"caption": "Haha, its cool being with someone I can be myself with.", "userid": 1, "storyid": 5}, 

  {"url": SERVER_URL + '/project - akashimitatingalex.jpg', updatedAt: Date.parse(new Date(2016, 02, 11, 3, 24, 0)),
"caption": "Akash channeling his inner Alex", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - alex.jpg', updatedAt: Date.parse(new Date(2016, 01, 27, 3, 24, 0)),
"caption": "The man. The myth. The legend.", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - alexpissedoffbyjulien.jpg', updatedAt: Date.parse(new Date(2016, 01, 25, 3, 24, 0)),
"caption": "Apparently Julien said something stupid. Its only week 1!", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - attemptstobeproductive.jpg', updatedAt: Date.parse(new Date(2016, 01, 22, 3, 24, 0)),
"caption": "Excited by our gameplan! Lets make it a reality", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - hardatwork.jpg', updatedAt: Date.parse(new Date(2016, 02, 10, 3, 24, 0)),
"caption": "Lets goo!!!", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - julienatwork.jpg', updatedAt: Date.parse(new Date(2016, 01, 31, 3, 24, 0)),
"caption": "Julien working on making our camera feature work", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - julienbeingjulien.jpg', updatedAt: Date.parse(new Date(2016, 02, 02, 3, 24, 0)),
"caption": "Julien being Julien", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - julienlikeWTF.jpg', updatedAt: Date.parse(new Date(2016, 01, 28, 3, 24, 0)),
"caption": "HAHAHAHA. Love Juliens facial expressions", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - latenightbartride.jpg', updatedAt: Date.parse(new Date(2016, 02, 5, 3, 24, 0)),
"caption": "Julien and I on Bart after a late night. He's so easy to annoy", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - suyaandherboys.jpg', updatedAt: Date.parse(new Date(2016, 02, 4, 3, 24, 0)),
"caption": "Suya and her boys", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - suyasboys.jpg', updatedAt: Date.parse(new Date(2016, 02, 7, 3, 24, 0)),
"caption": "Suya and her boys take 2", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - thecrew.jpg', updatedAt: Date.parse(new Date(2016, 02, 12, 3, 24, 0)),
"caption": "Grateful to work with such an awesome group of people", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - thefam.jpg', updatedAt: Date.parse(new Date(2016, 02, 12, 2, 24, 0)),
"caption": "Coding family", "userid": 1, "storyid": 3}, 
  {"url": SERVER_URL + '/project - whenyoucantwork.jpg', updatedAt: Date.parse(new Date(2016, 02, 9, 3, 24, 0)),
"caption": "We got frustrated so we decided to take a break", "userid": 1, "storyid": 3},

  {"url": SERVER_URL + '/trivedi - akashgradfrompreschool.jpg', updatedAt: Date.parse(new Date(1990, 05, 08, 3, 24, 0)),
"caption": "The kid is growing up so fast", "userid": 1, "storyid": 2}, 
  {"url": SERVER_URL + '/trivedi - bathtime.jpg', updatedAt: Date.parse(new Date(1986, 01, 05, 3, 24, 0)),
"caption": "You always loved bathtime for some reason", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - dadactinglikeastud.jpg', updatedAt: Date.parse(new Date(1979, 12, 10, 3, 24, 0)),
"caption": "Dad with the love of his life", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - faminhawaii.jpg', updatedAt: Date.parse(new Date(2009, 07, 08, 3, 24, 0)),
"caption": "Fam in hawaii. Nice to see us so happy", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - firstcampingtrip.jpg', updatedAt: Date.parse(new Date(1988, 08, 16, 3, 24, 0)),
"caption": "Akashs love for the outdoors begins...", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - firstweekhome.jpg', updatedAt: Date.parse(new Date(1984, 12, 25, 3, 24, 0)),
"caption": "First week home from the hospital", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - grandmalookingon.jpg', updatedAt: Date.parse(new Date(1984, 12, 16, 3, 24, 0)),
"caption": "Grandma looking on pensively. First grandson!", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - hangingwithmom.jpg', updatedAt: Date.parse(new Date(1987, 02, 15, 3, 24, 0)),
"caption": "Akash wasnt always this nice", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - meanddadinalaska.jpg', updatedAt: Date.parse(new Date(2010, 05, 10, 3, 24, 0)),
"caption": "Dad got seasick right after this. Bahaha.", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - meandmom.jpg', updatedAt: Date.parse(new Date(2005, 05, 30, 3, 24, 0)),
"caption": "Mom and son", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - momanddadgettingmarried.jpg', updatedAt: Date.parse(new Date(1976, 08, 02, 3, 24, 0)),
"caption": "Mom and dad get married after just 3 dates!", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - momanddadontheswing.jpg', updatedAt: Date.parse(new Date(2007, 09, 3, 3, 24, 0)),
"caption": "Still going strong after all these years", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - momandmearguing.jpg', updatedAt: Date.parse(new Date(1995, 08, 18, 3, 24, 0)),
"caption": "Me being a dramaqueen", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - momandmesharingamoment.jpg', updatedAt: Date.parse(new Date(2001, 11, 11, 3, 24, 0)),
"caption": "It hasnt always been smooth sailing but the love is real", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - momprego.jpg', updatedAt: Date.parse(new Date(1985, 09, 01, 3, 24, 0)),
"caption": "Mom pregnant with me", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - momteachingmehowtoride.jpg', updatedAt: Date.parse(new Date(1992, 06, 23, 3, 24, 0)),
"caption": "Making sure I dont fall down since day 1", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - newtoamerica.jpg', updatedAt: Date.parse(new Date(1976, 08, 10, 3, 24, 0)),
"caption": "Fresh off the boat", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - rockinghoodiessincedayone.jpg', updatedAt: Date.parse(new Date(1985, 12, 20, 3, 24, 0)),
"caption": "Haha I guess I loved wearing hoodies since day 1", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - teenageangst.jpg', updatedAt: Date.parse(new Date(2000, 06, 15, 3, 24, 0)),
"caption": "Ugh. Teenage angst", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - withmydude.jpg', updatedAt: Date.parse(new Date(1987, 06, 13, 3, 24, 0)),
"caption": "Always looked up to this guy", "userid": 1, "storyid": 2},
  {"url": SERVER_URL + '/trivedi - firstriptodisneyland.jpg', updatedAt: Date.parse(new Date(1989, 07, 20, 3, 24, 0)),
"caption": "Once a kid. Always a kid", "userid": 1, "storyid": 2},
 


  
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
