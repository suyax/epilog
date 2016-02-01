/**
 * Module dependencies.
 */
var Users = require('../users/userModel');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var uuid = require('node-uuid');


// token store, should be a redis server but whateves.
var tokens = {};

// makes a token, stores it, and returns it
var makeToken = function (userid) {
  token = uuid.v4();
  tokens[token] = {
    userid: userid,
    timestamp: Date.now(),
  };
  return token;
};

// takes in username and password
// return token or null
var authenticateUser = function (email, password){
  // if valid username and password
  return Users.getByEmail(email)
  .then(function(user){
    if(!user){
      return {error:'User does not exist'};
    } else {
      return Promise.promisify(bcrypt.compare)(password, user.password)
      .then(function (match) {
        if(match) {
          // make a new token
          // put token and user id in token store
          // return token
          return makeToken(user.id);
        } else {
          return {error:'Incorrect password'};
        }
      });
    }
  });
}

// takes a token
// returns the user associated with the token
// if the token is valid
var authenticateToken = function (token) {
  // expire tokens in 7 days
  var expire = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds... I hope
  if(tokens.hasOwnProperty(token) &&
    (Date.now() - tokens[token].timestamp < expire)){
    return tokens[token].userid;
  } else {
    // delete the token because it expired
    delete tokens[token];
    return undefined
  }
}

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
var createUser = function (newUser){
  return Users.create(newUser)
  .then(function(user) {
    // user successfully created
    return makeToken(user.id);
  });
}

var logout = function(token) {
  if(tokens.hasOwnProperty(token)){
    delete tokens[token];
  }
}

module.exports = {
  authenticateToken: authenticateToken,
  authenticateUser: authenticateUser,
  createUser: createUser,
  logout: logout,
}
