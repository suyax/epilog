var updateModel = require('./updateModel');

module.exports =  {
  getRecent: function (req, res) {
    var userId = req.user.id;
    //console.log('Update Controller Reached');
   updateModel.getAllMoments(userId)
      .then(function(stories) {
        var allMoments = [];
        stories.forEach(function(story) {
          story.moments.forEach(function(moment) {
            allMoments.push(moment)
          })
        })
        return allMoments;
      })
     .then(function (moments) {
        return moments.sort(function(a, b) {
          if (a.updatedAt > b.updatedAt) {
            return 1;
          }
          if (a.updatedAt < b.updatedAt) {
            return -1;
          }
          return 0;
        })
      })
      .then(function (sortedMoments) {
        res.status(200).json(sortedMoments);
      })
      .catch(function (error) {
        console.log('Failed to retrieve update ', error);
        res.status(404).end();
      });
  }
};
