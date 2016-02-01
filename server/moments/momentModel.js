var sequelize = require('../db/dbModel').sequelize;
var Promise = require('bluebird');
var moments = require('../db/dbModel').Moment;
var stories = require('../db/dbModel').Story;
var users = require('../db/dbModel'). User;
var users_stories = require('../db/dbModel').Users_Stories;
var moments_stories = require('../db/dbModel').Moments_Stories; 

module.exports = {

  add: function (momentInfo){
    // console.log('moment info from controller -->', momentInfo);
    return sequelize.transaction(function (t) {  
      //used @ end, when associating a new moment with a story
      var momentId;
      //first add a new moment 
      return moments.create(
        {
          url: momentInfo.url,
          caption: momentInfo.caption,
          userid: momentInfo.userid
        }, {transaction: t})
        //next, check if new users have been added to story via moment
        .then(function (addedMoment) {
          // console.log("addedMoment-->", addedMoment.dataValues);
          
          momentId = addedMoment.dataValues.id;
          //if so, add new users to users_stories join table
          if(momentInfo.newCharacters && momentInfo.newCharacters.length > 0){
            var dataForUsersStoriesTable = momentInfo.newCharacters.map(function(userId){
              return {storyId: momentInfo.storyid, userId: userId};
            });
            // console.log("dataForUsersStoriesTable -->",dataForUsersStoriesTable);
            return users_stories.bulkCreate(
              dataForUsersStoriesTable
              ,{transaction: t});
          }
          //if no additional users added, simply return the addedMoment and move onto last promise
          return addedMoment;
        //finally, add moment to story id in the moments_stories join table
        }).then(function () {
          var momentStoryDataPair = {storyId: momentInfo.storyid, momentId: momentId};
          // console.log("momentStoryDataPair-->", momentStoryDataPair);
          return moments_stories.create(
            momentStoryDataPair
            , {transaction: t});
        }).then(function (result) {
          console.log("successfully added a moment");
          return result.dataValues;
        }).catch(function (err) {
          console.error("Error at adding a moment: ", err)
        });
    });
  },

  getAll: function (storyid) {
    return moments.findAll({
      where: { storyid: storyid }
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

