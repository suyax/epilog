// var Sequelize = require('Sequelize');
var sequelize = require('../db/dbModel').sequelize;
var Promise = require('bluebird');
var stories = require('../db/dbModel').Story;
var moments = require('../db/dbModel').Moment;
var users = require('../db/dbModel').User;
var users_stories = require('../db/dbModel').Users_Stories;
var moments = require('../db/dbModel').Moment;
var tags = require('../db/dbModel').Tag;

module.exports = {

  add: function (storyData){
    //data to go into story table
    var dataForStoryTable = {
      title: storyData.title,
      description: storyData.description
    };

    return sequelize.transaction(function (t) {
      //first add new story to story table
      return stories.create(
        dataForStoryTable, {transaction: t})
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
      return result[0].dataValues ;
    }).catch(function (err) {
      console.error("Error at adding a story: ", err)
    });
  },

  getOne: function (storyId){
    return stories.find({
      where: { id: storyId },
      include: [{
        model: users,
        attributes: ['id', 'firstName', 'lastName', 'email']
      },
      {
        model: moments,
        include: [{
          model: tags
        }]
      }]
    })
    .then(function (result) {
      return result.dataValues;
    })
    .catch(function (error) {
      console.error('Error at getting a story: ', error);
    });
  },

  filterByTag: function(searchCriteria) {
    return stories.find({
      where: {
        id: searchCriteria.storyId
      },
      include: [{
        model: moments,
        include: [{
          model: tags,
          where: {
            name: searchCriteria.tag
          }
        }]
      }]
    })
    .then(function(moments){
      // console.log("moments by tag name -->", moments);
      return moments;
    })
    .catch(function(error){
      console.error("error trying to filter story by tag name: ", error);
    })
  },

  getAll: function (userId) {
    return users.findOne({
        where: {id: userId},
        include: [{
          model: stories,
          include: [
            {model: moments/*, include: [{model: tags}]*/},
            {model: users, attributes: ['id', 'firstName', 'lastName', 'email']}
          ]
        }]
    }).then(function(result){
      console.log('Moments from getAll: ',
        result.stories.map(function (story) {
          return story.dataValues.moments;
        }));
      return result.stories;
    }).catch(function(err){
      console.error("error trying to get all story objects-->", err);
    });
  },

  getAllByTitle: function(storyTitle, userId) {
    console.log('Reached getAllByTitle: ', storyTitle, userId);
    return users.findOne({
      where: {id: userId},
      include: [{
        model: stories
      }]
    })
      .then(function (result) {
        console.log('Results from storyModel: ', result);
        return result.dataValues.stories.filter(function (story) {
          return story.dataValues.title === storyTitle;
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};
