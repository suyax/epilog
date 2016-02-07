var sequelize = require('../db/dbModel').sequelize;
var Promise = require('bluebird');
var users = require('../db/dbModel'). User;
var users_stories = require('../db/dbModel').Users_Stories;
var stories = require('../db/dbModel').Story;
var moments_stories = require('../db/dbModel').Moments_Stories;
var moments = require('../db/dbModel').Moment;
var tags = require('../db/dbModel').Tag;

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
          var momentStoryDataPair = { storyId: momentInfo.storyid, momentId: addedMoment.dataValues.id };
          return moments_stories.create(
            momentStoryDataPair
            , {transaction: t});
        })
        // .then(function (addedMoment) {
        //   console.log("Moment added within model file: ", addedMoment);

        //   momentId = addedMoment.dataValues.id;
        //   //if so, add new users to users_stories join table
        //   if(momentInfo.newCharacters && momentInfo.newCharacters.length > 0){
        //     var dataForUsersStoriesTable = momentInfo.newCharacters.map(function(userId){
        //       return {storyId: momentInfo.storyid, userId: userId};
        //     });
        //     // console.log("dataForUsersStoriesTable -->",dataForUsersStoriesTable);
        //     return users_stories.bulkCreate(
        //       dataForUsersStoriesTable
        //       ,{transaction: t});
        //   }
        //   //if no additional users added, simply return the addedMoment and move onto last promise
        //   return addedMoment;
        // //finally, add moment to story id in the moments_stories join table
        // })
        .then(function (result) {
          console.log("successfully added a moment");
          return result.dataValues;
        }).catch(function (err) {
          console.error("Error at adding a moment: ", err)
        });
    });
  },

  getOne: function (momentId) {
    return moments.find({
      where: { id: momentId },
      include: [{
        model: tags
      }]
    })
    .then(function(momentObj){
      // console.log("moment obj returned from getOne query-->", momentObj);
      return momentObj;
    })
    .catch(function(error){
      console.error('Error at getting moment: ', error);
    })
  },

  getAll: function (storyid) {
    return moments.findAll({
      where: { storyid: storyid }
     ,order: ['updatedAt', 'DESC']})
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

