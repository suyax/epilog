var Sequelize = require('Sequelize');

module.exports = function (sequelize) { 
  return sequelize.define('Story', {
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

  }, { timestamps: true });
};
