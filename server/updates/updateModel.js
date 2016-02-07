var Moments = require('../db/dbModel').Moment;
var Users = require('../db/dbModel').User;
var Comments = require('../db/dbModel').Comment;
var Stories = require('../db/dbModel').Story;

module.exports = {
  getAllMoments: function (userId) {
    console.log('userId',userId);
    return Users.findAll({
      include: [{
        model: Stories,
        include: [
        {model: Users}]
      }]
    }).then(function(results) {
      var allMoments = results.map(
        function (moment) {
          return moment.dataValues;
        });
      console.log ('all the update of moments-->', allMoments);
      return allMoments;
    }).catch(function(err){
      console.error("error trying to get all update-->", err);
    });
  },
  getAllComments: function (userId) {
    return Comments.findAll({
      where: { userid: userId }
    }).then(function(commentsResults) {
      console.log('all the update of moments-->', results);
      return commentsResult;
    });
  }
};
