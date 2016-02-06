var userModel = require('./userModel');
var Promise = require('bluebird');

module.exports =  {
  
  //mvp for now...
  add: function (req, res){
    var userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      token: req.body.token,
      password: req.body.password 
    };

    userModel.add(userData)
      .then(function (results){
        res.status(201).json(results);
      })
      .catch(function (error){
        res.status(404).json();
      });
  },

  find: function(req, res) {
    var emails = JSON.parse(req.headers.emails);

    Promise.map(emails, function (email) {
      return userModel.getByEmail(email)
        .then(function (result) {
          return result.dataValues.id;
        });
    })
      .then(function (mapped) {
        res.status(201).json(mapped);
      });
  },

  remove: function (req, res){
  },
  addFriend: function (req, res){
  },
  removeFriend: function (req, res){
  },
  
};
