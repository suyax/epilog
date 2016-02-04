var Comment = require('./commentModel');

var addOne = function (req, res) {
  if(req.body.text === undefined || 
    req.body.momentId === undefined ||
    req.user.id === undefined){
    res.status(400).end();
  } else {
    Comment.addOne(req.body.text, req.user.id, req.body.momentId)
    .then(function (comment) {
      ress.json(comment.get());
    })
    .catch(function(error){
      console.log('failed to add a comment: ', error)
      res.status(400).end();
    });
  }
};

var getAll = function (req, res) {
  if(req.query.momentId){
    Comment.getAllByMoment(req.query.momentId)
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
  } else if (req.query.userId) {
    Comment.getAllByUser(req.query.userId)
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
    res.status(400).end();
  }
};
var getOne = function (req, res, next) {
  if(req.body.commentId === undefined){
    res.status(400).end();
  } else {
    Comment.getOne(req.body.commentId)
    .then(function (comment) {
      res.json(comment.get());
    })
    .catch(function (error) {
      res.status(400).end();
    });
  }
};
