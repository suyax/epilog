var Moments = require('../db/dbModel').Moment;
var Users = require('../db/dbModel').User;
var Comments = require('../db/dbModel').Comment;
var Stories = require('../db/dbModel').Story;

module.exports = {
  getAllMoments: function (userId) {
    return Users.findOne({
      where: {id: userId},
      include: [{
        model: Stories,
        include: [{
          model: Moments,
          order: [['updatedAt', 'DESC']],
        }],
        order: [['updatedAt', 'DESC']],
      }]
    }).then(function(result) {
      return result.stories;
    }).catch(function(err){
      console.error("error trying to get all update-->", err);
    });
  },

  getAllComments: function (userId) {
    return Comments.findOne({
      where: { userid: userId },
      include: [{
        model: Moments
      }]
    }).then(function(commentsResults) {
      return commentsResult;
    });
  }
};
