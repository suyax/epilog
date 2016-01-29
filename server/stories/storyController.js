var storyModel = require('./storyModel');

module.exports =  {

  add: function (req, res){
  	var story = {
  	  title: req.body.title,
  	  description: req.body.description
  	};

  	storyModel.add(story)
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
    storyModel.getAll()
      .then(function (results) {
        res.status(200).json(results);
      })
      .catch(function (error) {
        res.status(404).json();
      });
  }
};
