var momentModel = require('./momentModel');

module.exports =  {

  getAllMoments: function (req, res) {
    var storyId = req.params.storyId;
    momentModel.getAll(storyId)
      .then(function (results) {
        res.status(200).send(results);
      })
      .catch(function (error) {
        res.status(404).send();
      });
  },

  addMoment: function(req, res){
    momentModel.build({
      url: req.body.url,
      caption: req.body.caption,
      storyid: req.params.storyId
    })
    .save()
    .then(function(results){
      res.status(200).send(results);
    })
    .catch(function(error){
      res.status(404).send();
    });
  }

};
