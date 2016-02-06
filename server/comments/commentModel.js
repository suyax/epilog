var dbModels = require('../db/dbModel');
var User = dbModels.User;
var Moment = dbModels.Moment;
var Comment = dbModels.Comment;

// create a new comment and associate it with the given user and moment
// input: text, userID, momentID
// output: new comment object
var addOne = function (text, userID, momentID) {
  return Comment.create({text: text, userId: userID, momentId: momentID});
};

// get all the comments for a given moment
// input: momentID
// output: (promise) array of comments
var getAllByMoment = function (momentID) {
  return Comment.findAll({where:{momentId: momentID},order:['createdAt', 'DESC']});
};

// get all the comments writen by given user
// input: userID
// output: (promise) array of comments
var getAllByUser = function (userID) {
  return Comment.findAll({where:{userId: userID}});
};

// get one comment given the commentID
// input: commentID
// output: the one comment object
var getOne = function (commentID) {
  return Comment.findOne({where:{id:commentID}});
};

module.exports = {
  getOne:getOne,
  getAllByUser: getAllByUser,
  getAllByMoment: getAllByMoment,
  addOne: addOne,
}
