var Sequelize = require('Sequelize');
var Promise = require('bluebird');
var stories = require('../db/dbModel').Story;
var moments = require('../db/dbModel').Moment;

module.exports = {

  add: function (story){
    console.log("story object -->", story);
    console.log(stories);
    console.log(moments);
    return stories.build({
      title: story.title,
      description: story.description
    })
    .save()
    .then(function (results){
      console.log("successfully added a story");
      return results.dataValues;
    })
    .catch(function (error){
      console.error("Error at adding a story: ", error);
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
