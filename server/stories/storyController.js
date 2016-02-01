var storyModel = require('./storyModel');

module.exports =  {

  check: function(req, res){
    // console.log("req coming in from client-->",req.body);
    var userId = req.params.userId; 
    var title = req.body.title;
    storyModel.check(userId, title)
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (error) {
        res.status(404).json();
      });
  },

  add: function (req, res){
    // console.log("req body coming in from client-->", req.body);
    
    //convert param representing storyCreator to number
    var storyCreator = Number(req.params.userId);
    // console.log("req params-->", req.params.userId);
    
    //modify req.body.existingUsersToInclude to include the storyCreator
    req.body.existingUsersToInclude.unshift(storyCreator);
    var storyData = {
  	  title: req.body.title,
  	  description: req.body.description,
      //NOTE: for this to work, expecting an array of user ids
      existingUsersToInclude: req.body.existingUsersToInclude
      //eventually will want to do something with new users!!
  	};

  	storyModel.add(storyData)
  	  .then(function (results){
  	    res.status(201).json(results);
  	  })
  	  .catch(function (error){
  	    res.status(404).json();
  	  });
  },

  getOne: function (req, res) {
    var storyId = req.params.storyId;
    storyModel.getOne(storyId)
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (error) {
        res.status(404).json();
      });
  },
  
  getAll: function (req, res) {
    var userId = req.params.userId; 
    storyModel.getAll(userId)
      .then(function (results) {
        res.status(200).json(results);
      })
      .catch(function (error) {
        res.status(404).json();
      });
  }
};
