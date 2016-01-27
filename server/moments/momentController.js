var momentModel = require('./momentModel');

module.exports =  {

  addMoment: function (req, res){
    var moment = {
      url: req.body.url,
      caption: req.body.caption,
      storyid: req.params.storyId
    };

    momentModel.add(moment)
      .then(function (results){
        res.status(201).send(results);
      })
      .catch(function (error){
        res.status(404).send();
      });
  },

  getAllMoments: function (req, res) {
    var storyId = req.params.storyId;
    momentModel.getAll(storyId)
      .then(function (results) {
        res.status(200).send(results);
      })
      .catch(function (error) {
        res.status(404).send();
      });
  }
};
