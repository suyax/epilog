var Sequelize = require('Sequelize');
var Promise = require('bluebird');
var stories = require('../db/dbModel').Story;

module.exports = {

  getAll: function () {
    return stories.findAll()
      .then(function (results) {
        var allStories = results.map(function (story) {
          return story.dataValues;
        });

        return allStories;
      })
      .catch(function (error) {
        console.log('Error at getting all stories: ', error);
      });
  }
  
};


var getOne = function (title) {
};


var insertStory = function (story) {
};
