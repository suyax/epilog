var Sequelize = require('Sequelize');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/epilog';
var sequelize = new Sequelize(connectionString);


var Story = sequelize.define('stories', {
  id: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  title: {
    type: Sequelize.STRING,
    notNull: true
  },

  description: {
    type: Sequelize.STRING,
    notNull: true
  }

  // Add characters later

}, { timestamps: false });


var Moment = sequelize.define('moments', {
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
}, { timestamps: false });

// var Comment
// var Tag
// var User

var init = function () {
  Moment.belongsTo(Story, { foreignKey: 'storyid' });
  Story.hasMany(Moment, { foreignKey: 'storyid' });
  sequelize.sync();
};

module.exports = {
  Story: Story,
  Moment: Moment,
  init: init
};
