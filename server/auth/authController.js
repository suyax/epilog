var auth = require('./auth');

module.exports = {
  createUser: function (request, response, next) {
    // control the schema
    if(request.body.email &&
      request.body.password &&
      request.body.firstName &&
      request.body.lastName){
        auth.createUser({
          email: request.body.email,
          password: request.body.password,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
        })
        .then(function (token) {
          response.json({token: token});
        })
        .catch(function (error){
          console.log('Error in creating a User: ' + error);
          response.status(400).json({error: error});
        })
      } else {
        response.status(400).json({error: "BAD INPUT"});
      }
  },

  authenticateUser: function (request, response) {
    if(request.body.email && request.body.password){
      auth.authenticateUser(request.body.email, request.body.password)
      .then(function (token) {
        if(token.error){
          response.status(401).end();
        } else {
          response.json({token: token});
        }
      })
      .catch(function (error) {
        console.log('Error while trying to authenticate user: ', error);
      });
    }
  },

  authenticateToken: function (request, response, next) {
    console.log("Request Header: " + request.header);
    var userid = auth.authenticateToken(request.get('token'));
    if(userid){
      request.user = {id: token.userid};
      next();
    } else {
      response.status(401).end();
    }
  },

  logout: function (request, response) {
    auth.logout(request.body.token);
    response.end();
  },
}
