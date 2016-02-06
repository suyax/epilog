var Moments = require('../db/dbModel').Moment;
var Users = require('../db/dbModel').User;
var Comments = require('../db/dbModel').Comment;

module.exports = {
  getAllMoments: function (userId) {
    return Moments.findAll(
      { where: { userid: userId }
    }).then(function(momentsResults) {
      console.log ('all the update of moments-->', results);
      return momentResults;
    }).catch(function(err){
      console.error("error trying to get all update-->", err);
    });
  },
  getAllComments: function (userId) {
    return Comments.findAll(
      { where: { userid: userId }
    }).then(function(commentsResults) {
      console.log('all the update of moments-->', results);
      return commentsResult;
    });
  }
};
