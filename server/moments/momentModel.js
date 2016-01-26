var Sequelize = require('Sequelize');

module.exports = function (sequelize) {
  return sequelize.define('Moment', {
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
