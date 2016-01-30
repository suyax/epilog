var Sequelize = require('Sequelize');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var User = require('../db/dbModel').User;


module.exports = {

  getByEmail: function (email){
    return User.findOne({
      where: {
        email: email,
      }
    });
  },

  // inputs:
    //  newUser: 
    //    email: the useraname
    //    password: the password
    //    first_name: the first name
    //    last_name: the last name
    // output:
    // in data field:
    //    message: if failure, reason for failure
    // side effects:
    //    hashes the password
  create: function (newUser){
    // hashing is not done by the model, though it probably should
    return Promise.promisify(bcrypt.hash)(newUser.password,null,null)
    .then(function (data) {
      newUser.password = data;
      return User.create(newUser);
    });
  },


  remove: function (storyId){

  },

  addFriend: function(story){

  },

  removeFriend: function(story){

  }
};
