/**
 * Module dependencies.
 */
var Users = require('../users/userModel');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var jwt = require('jwt-simple');

const SECRET = require('../../config').AUTH_TOKEN_SECRET;
const EXPIRE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds... I hope

// makes a token, stores it, and returns it
var makeToken = function (userid) {
  var payload = {
    userid: userid,
    expires: Date.now() + EXPIRE,
  };
  var token = jwt.encode(payload, SECRET);
  // console.log(token);
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
  var decoded = undefined;
  try{
    decoded = jwt.decode(token, SECRET);
  } catch (error) {
    console.log('bad token: ', error);
  }

  if(decoded && decoded.expires > Date.now()){
    return decoded.userid;
  } else {
    return undefined;
  }
}

  // inputs:
    //  newUser:
    //    email: the useraname
    //    password: the password
    //    firstName: the first name
    //    lastName: the last name
    // output:
    // in data field:
    //    message: if failure, reason for failure
    // side effects:
    //    hashes the password
    //test token: 24b4e8d6-2fff-4ee5-81d5-54ebd7bc91fb
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
