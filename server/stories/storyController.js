var storyModel = require('./storyModel');

module.exports =  {

  add: function (req, res){
    //convert param representing storyCreator to number
    var storyCreator = Number(req.user.id);

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
        console.log('Returning from story controller: ', results);
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

  filterByTag: function (req, res) {
    var searchCriteria = {
      tag: req.body.tag,
      storyId: req.params.storyId
    }
    storyModel.filterByTag(searchCriteria)
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (error) {
        res.status(404).json();
      });
  },
  
  getAll: function (req, res) {
    var userId = req.user.id;
    console.log(req.query.storyTitle);

    if (req.query.storyTitle) {
      storyModel.getAllByTitle(req.query.storyTitle, userId)
        .then(function (stories) {
          stories[0].userId = userId;
          res.json(stories[0].dataValues);
        })
        .catch(function (error) {
          console.log('Failed to retrieve story by title: ', error);
          res.status(404).send(false);
        });
    } else {
      console.log('Story Controller Reached');
      storyModel.getAll(userId)
        .then(function (stories) {
          res.status(200).json(stories);
        })
        .catch(function (error) {
          console.log('Failed to retrieve stories for user: ', error);
          res.status(404).end();
        });
    }

    // var userId = req.user.id;
    // storyModel.getAll(userId)
    //   .then(function (results) {
    //     res.status(200).json(results);
    //   })
    //   .catch(function (error) {
    //     res.status(404).json();
    //   });
  }
};
