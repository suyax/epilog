var storyModel = require('./storyModel');

module.exports =  {
  getAllStories: function (req, res) {
    var stories = storyModel.getAll();
    res.status(200).send(stories);
  }
};
