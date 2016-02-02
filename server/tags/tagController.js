var tagModel = require('./tagModel');

module.exports =  {

  add: function (req, res){
    var momentId = req.params.momentId;
    //expecting req.body to be an array of tag names;
    var tags = req.body.tags;
    var tagData = {
      momentId: momentId,
      tags: tags
    };
    // console.log("tagData -->", tagData);
  	tagModel.add(tagData)
  	  .then(function (results){
  	    res.status(201).json(results);
  	  })
  	  .catch(function (error){
  	    res.status(404).json();
  	  });
  }
};
