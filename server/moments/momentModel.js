var Sequelize = require('Sequelize');
var Promise = require('bluebird');

module.exports = function (sequelize) {
  return sequelize.define('moments', {
    id: {
      type: Sequelize.INTEGER, 
      primaryKey: true,
      autoIncrement: true    
    },

    url: {
      type: Sequelize.STRING,
      notNull: true
    },

    caption: {
      type: Sequelize.STRING,
      notNull: true
    }
  }, { timestamps: true });
};
