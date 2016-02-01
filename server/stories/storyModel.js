// var Sequelize = require('Sequelize');
var sequelize = require('../db/dbModel').sequelize;
var Promise = require('bluebird');
var stories = require('../db/dbModel').Story;
var moments = require('../db/dbModel').Moment;
var users = require('../db/dbModel'). User;
var users_stories = require('../db/dbModel').Users_Stories;

module.exports = {

  check: function(userId, title){
    console.log("check params from controller -->", userId, title);
    return stories.find({
        attributes: ['title'],
        include: [{
          model: users,
          where: {
            id: userId
          }
        }],
        where: {
          title: title
        }
      })
      .then(function (result) {
        return result !== null ? true : false;
      })
      .catch(function (error) {
        console.error('Error checking a story: ', error);
      });
  },

  add: function (storyData){
    // console.log("story data from controller-->",storyData);   
    //data to go into story table 
    var dataForStoryTable = {
      title: storyData.title,
      description: storyData.description
    };

    return sequelize.transaction(function (t) {
      //first add new story to story table
      return stories.create(
        {
          title: dataForStoryTable.title,
          description: dataForStoryTable.description
        }, {transaction: t})
        //then add existing users a part of story to users_stories join table (including user that created story)
        .then(function (addedStory) {
          // console.log("story added to DB-->", addedStory.dataValues);
          var dataForUsersStoriesTable = storyData.existingUsersToInclude.map(function(userID){
            return {storyId: addedStory.dataValues.id, userId: userID};
          });
            return users_stories.bulkCreate(
              dataForUsersStoriesTable
              ,{transaction: t});
        });
    }).then(function (result) {
      console.log("successfully added a story and new users");
      return result.dataValues;
    }).catch(function (err) {
      console.error("Error at adding a story: ", err)
    });
  },
  
  getOne: function (storyId){
    return stories.find({
      where: { id: storyId },
      include: [{
        model: users
      },
      {
        model: moments
      }]
    })
    .then(function (result) {
      return result.dataValues;
    })
    .catch(function (error) {
      console.error('Error at getting a story: ', error);
    });
  },

  getAll: function (userId) {
    // console.log('Calling getAll in storyModel: ',stories);
    var returnData = [];
    var self = this; 

    return users.findOne({
      where: {id: userId},
      include: [{
        model:stories,
        include: [
        {model: moments},
        {model: users,
         attributes: ['id', 'first_name', 'last_name', 'email']
        }
        ]
      }]
      }).then(function(result){
        console.log(result.stories);
        return result.stories;
      }).catch(function(err){
        console.error("error trying to get all story objects-->", err);
      });
  }
};
