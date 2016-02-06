var updateModel = require('./updateModel');

module.exports =  {

  getRecent: function (req, res) {
    var userId = req.user.id;
    var allUpdate;
    updateModel.getAllMoments(userId)
      .then (function(allMoment) {
        allUpdate = allMoment + updateModel.getAllMoments(userId);
        return allUpdate;
      })
      .then(function (results) {
        res.status(200).json(results);
      })
      .catch(function (error) {
        res.status(404).json();
      });
  }
};
