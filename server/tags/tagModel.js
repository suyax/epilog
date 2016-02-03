var sequelize = require('../db/dbModel').sequelize;
var Promise = require('bluebird');
var tags = require('../db/dbModel').Tag;
var moments = require('../db/dbModel').Moment;
var tags_moments = require('../db/dbModel').Tags_Moments;


module.exports = {

  getAllByMoment: function (momentId){
    return tags.findAll({
      attributes: ['name'],
      include: [{
        model: moments,
        where: {
          id: momentId
        }
      }]
    }).then(function(result){
      var arrayOfTagNames = result.map(function(tagObj){
        return tagObj.dataValues.name;
      });
      console.log("array of tag names by moment from model -->", arrayOfTagNames);
      return arrayOfTagNames;
    }).catch(function(error){
      console.error('Error getting tags by Moment:' , error);
    })
  },

  add: function (tagData){
    // console.log("tagData passed in from controller-->", tagData);
    var momentId = tagData.momentId; 
    var arrOfTagObjs = tagData.tags.map(function(tagName){
      return {name: tagName};
    });
    return sequelize.transaction(function (t) {
      return tags.bulkCreate(
        arrOfTagObjs
        ,{returning: true} 
        ,{transaction: t})
        .then(function(addedTags){
          var arrOfTagIds = addedTags.map(function(tagObj){
            return tagObj.dataValues.id;
          });
          var tagMomentObjArr = arrOfTagIds.map(function(tagId){
            return {momentId: momentId, tagId: tagId};
          });
          return tags_moments.bulkCreate(
            tagMomentObjArr
            ,{transaction: t});
        })
        .catch(function(err){
          console.error("Error adding tags: ", err);
        });
    });
  }
};
