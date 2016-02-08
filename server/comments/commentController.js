var Comment = require('./commentModel');

// add a comment,
// input: text and momentid on body, userid from auth token
// output: json comment object
var addOne = function (req, res) {
  if(req.body.text === undefined || 
    req.body.momentId === undefined ||
    req.user.id === undefined){
    res.status(400).end();
  } else {
    Comment.addOne(req.body.text, parseInt(req.user.id), parseInt(req.body.momentId))
    .then(function (comment) {
      res.json(comment.get());
    })
    .catch(function(error){
      console.log('failed to add a comment (commentController line 18): ', error)
      res.status(400).end();
    });
  }
};

// get all of the comments by moment or by user
// input: momentId or userId in url query
// ouput: json array of comment objects
var getAll = function (req, res) {
  if(req.query.momentid){
    Comment.getAllByMoment(parseInt(req.query.momentid))
    .then(function (comments) {
      res.json(comments.map(function(comment){
        /// get the data value out
        return comment.get();
      }));
    })
    .catch(function (error) {
      console.log('failed to retrieve comments by moment: ', error);
      res.status(400).end();
    });
  } else if (req.query.userid) {
    Comment.getAllByUser(parseInt(req.query.userid))
    .then(function (comments) {
      res.json(comments.map(function(comment){
        return comment.get();
      }));
    })
    .catch(function (error) {
      console.log('failed to retrieve comments by user: ', error);
      res.status(400).end();
    });
  } else {
    console.log('dont have a momentid or user id')
    res.status(400).end();
  }
};

// get one comment given a comment
// input: momentId on the request body
// output: json comment object
var getOne = function (req, res, next) {
  if(req.params.commentId === undefined){
    res.status(400).end();
  } else {
    Comment.getOne(req.params.commentId)
    .then(function (comment) {
      res.json(comment.get());
    })
    .catch(function (error) {
      res.status(400).end();
    });
  }
};

module.exports = {
  addOne: addOne,
  getAll: getAll,
  getOne: getOne
}
