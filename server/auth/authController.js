var auth = require('./auth');

module.exports = {
  createUser: function (request, response, next) {
    //HACK: request.body that was sent from client side, came in as an json object
    //with params on key and value as empty
    const body = JSON.parse(Object.keys(request.body)[0])
    const email = body.email
    const password = body.password
    const firstName = body.firstName
    const lastName = body.lastName
    console.log("signup", email,password,firstName,lastName)

    // control the schema
    if(email &&
      password &&
      firstName &&
      lastName){
        auth.createUser({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        })
        .then(function (token) {
          //console.log('create user token', token)
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
    //HACK: request.body that was sent from client side, came in as an json object
    //with params on key and value as empty
    const body = JSON.parse(Object.keys(request.body)[0])
    const email = body.email
    const password = body.password
    //console.log("server, email, password", email, password)

    if(email && password){
      auth.authenticateUser(email, password)
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
    var userid = auth.authenticateToken(request.get('token'));
    if(userid){
      request.user = {id: token.userid};
      next();
    } else {
      response.status(401).end();
    }
  },

  logout: function (request, response) {
    //HACK: request.body that was sent from client side, came in as an json object
    //with params on key and value as empty
    console.log('logout',request.get('token'))
    auth.logout(request.get('token'));
    response.json({message:'You are logged out'});
  },
}
