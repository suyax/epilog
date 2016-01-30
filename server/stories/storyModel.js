// var Sequelize = require('Sequelize');
var sequelize = require('../db/dbModel').sequelize;
var Promise = require('bluebird');
var stories = require('../db/dbModel').Story;
var moments = require('../db/dbModel').Moment;
var users = require('../db/dbModel'). User;
var users_stories = require('../db/dbModel').User_Stories;

module.exports = {

  add: function (storyData){
    //data to go into story table    
    var dataForStoryTable = {
      title: storyData.title,
      description: storyData.description
    };

    return sequelize.transaction(function (t) {
      //first add new story to story table
      return Story.create(
        {
          title: dataForStoryTable.title,
          description: dataForStoryTable.description
        }, {transaction: t})
        //then add existing users a part of story to users_stories join table
        .then(function (addedStory) {
          var dataForUsersStoriesTable = storyData.existingUsersToInclude.map(function(userID){
            return {storyid: addedStory.id, userid: userID};
          });
          return Users_Stories.bulkCreate(
            dataForUsersStoriesTable
            ,{transaction: t});
        });
    }).then(function (result) {
      console.log("successfully added a story and new users");
      return results.dataValues;
    }).catch(function (err) {
      console.error("Error at adding a story: ", err)
    });
  },

  getOne: function (storyId){
    return stories.find({
        where: { id: storyId },
        include: [moments]
      })
      .then(function (result) {
        return result.dataValues;
      })
      .catch(function (error) {
        console.error('Error at getting a story: ', error);
      });
  },

  getAll: function () {
    console.log('Calling getAll in storyModel: ',stories);
    return stories.findAll({
        include: [moments],
        required: true
      })
      .then(function (results) {
        var allStories = {};

        var storyArray = results.map(function (storyAndMoments) {          
          return storyAndMoments.dataValues;
        });

        allStories['stories'] = storyArray;

        return allStories;
      })
      .catch(function (error) {
        console.log('Error at getting all stories: ', error);
      });
  }
  
};
