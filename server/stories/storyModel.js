var Sequelize = require('Sequelize');
var Promise = require('bluebird');


module.exports = {
  stories: function (sequelize) { 
    return sequelize.define('stories', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      title: {
        type: Sequelize.STRING,
        unique: true,
        notNull: true
      },

      description: {
        type: Sequelize.STRING
      }

      // Add characters later

    }, { timestamps: false });
  },


  getAll: function () {
    require('../db/dbModel.js').Story.findAll()
      .then(function (stories) {
        var results = stories.map(function (story) {
          return story.dataValues;
        });

        return results;
      })
      .catch(function (error) {
        console.log('Error at getting all stories: ', error);
      });
  }
}


var getOne = function (title) {
};


var insertStory = function (story) {
};
