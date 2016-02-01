var userModel = require('./userModel');

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
  remove: function (req, res){
  },
  addFriend: function (req, res){
  },
  removeFriend: function (req, res){
  },
  
};