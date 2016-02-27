var tagModel = require('./tagModel');

module.exports =  {

  add: function (req, res) {
    //NOTE: expecting req.body to be an array of tag names;
    //define tags/momentId variables
    var tags = JSON.parse(req.headers.tags);
    var momentId = Number(req.params.momentId);

    //create a lookup hash that contains all of the tag names passed in by the client
    var tagNameLookUp = {};
    for (var i = 0; i < tags.length; i++) {
      if (tagNameLookUp[tags[i]] === undefined) {
        tagNameLookUp[tags[i]] = tags[i];
      }
    }

    var uniqueTags = [];
    for (var tag in tagNameLookUp) {
      uniqueTags.push(tag);
    }

    //create a tagData object that will be used IF all of the tags passed are NOT yet associated with the
    //given moment
    var tagData = {
      momentId: momentId,
      tags: uniqueTags
    };

    //FIRST, get all the tags associated with a given moment...
    tagModel.getAllByMoment(momentId)
      .then(function (results) {
        //...and check if ANY of the tags passed in match the names of those tags...
        for (var i = 0; i < results.length; i++) {
          if (results[i] in tagNameLookUp) {
            //...if so, inform the client that the tag already belongs to the moment
            res.status(409).json(results[i] + " is already a tag associated with this moment");
          }
        }
        //if NONE of the tags passed in are tied to a given moment, add the tags to the database
        tagModel.add(tagData)
          .then(function (results) {
            res.status(201).json(results);
          })
          .catch(function (error) {
            res.status(404).json();
          });
      })
      .catch(function (error) {
        res.status(404).json();
      });
  },

  getAllByStory: function (req, res) {
    var storyId = req.params.storyId;
    tagModel.getAllByStory(storyId)
      .then(function (results) {
        res.status(201).json(results);
      })
      .catch(function (error) {
        res.status(404).json();
      });
  }

};
