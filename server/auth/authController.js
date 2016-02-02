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
          console.log('Error in creating a User: ' , error);
          response.status(400).end();
        })
      } else {
        response.status(400).end();
      }
  },

  authenticateUser: function (request, response) {
    //HACK: request.body that was sent from client side, came in as an json object
    //with params on key and value as empty
    // const body = JSON.parse(Object.keys(request.body)[0])
    const email = request.body.email
    const password = request.body.password
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
    var userid = auth.authenticateToken(request.headers['token']);
    if(userid){
      request.user = {id: userid};
      next();
    } else {
      response.status(401).end();
    }
  },

  logout: function (request, response) {
    //HACK: request.body that was sent from client side, came in as an json object
    //with params on key and value as empty
    //console.log('logout',request.get('token'))
    auth.logout(request.get('token'));
    response.json({message:'You are logged out'});
  },
}
