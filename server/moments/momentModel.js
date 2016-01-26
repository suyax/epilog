var Sequelize = require('Sequelize');
var Promise = require('bluebird');
var moments = require('../db/dbModel').Moment;

module.exports = {

  getAll: function (storyid) {
    return moments.findAll({
      where: {storyid: storyid}
      })
      .then(function (results) {
        var allMoments = results.map(function (moment) {
          return moment.dataValues;
        });

        return allMoments;
      })
      .catch(function (error) {
        console.log('Error at getting all moments: ', error);
      });
  }
  
};

