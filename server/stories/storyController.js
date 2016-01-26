var storyModel = require('./storyModel');

module.exports =  {
  getAllStories: function (req, res) {
    storyModel.getAll()
      .then(function (results) {
        res.status(200).send(results);
      })
      .catch(function (error) {
        res.status(404).send();
      });
  }
};
