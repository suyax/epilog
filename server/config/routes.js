var controller = require('../controllers');
var request = require('request');


module.exports = function(app) {

  app.get('/', function (req, res) {

  });

  ////////////////////////////////////USERS//////////////////////////////////////////

  //CLIENT SIDE ROUTES THAT WILL AFFECT USER TABLE...

  //sign up 
    //add user info to database (including password and name etc.)
  app.post('/api/users/signup', controller.auth.createUser);
  
    //will need to modify to incorporate password/tokens etc; created mvp for testing purposes...
    app.get('/api/signup', controller.users.add);
  
  //invited page
    //verify if identifer exists in db
      //if so ask for remaining user info and create a session
      //if not, direct to sign up page
  //sign in 
    //verify whether or not user exists
      //if so, create a session
      //if not, direct user to sign in page
  app.post('/api/users/signin', controller.auth.authenticateUser);

  
  //log out
    //destroy session
    //route user to sign in page
  app.get('/api/users/logout', controller.auth.logout);
  
  //get one story for a given user
    //needs to include all users for the story as well as tags/comments for that story
  
  //get all stories for a given user
    //needs to include all users for each of those stories
    //eventually needs to include all moments tags and comments
  
  //add new or existing user to story 
    //new users (SKIP FOR NOW)
    //existing users (COMPLETED V1)
  

  //ROUTES THAT SHOULDN'T AFFECT USERS...but may want to think about this more...
  //create a new moment
    //need to be able to add a comment, tag
  
  //get a moment
    //need to be able to view a comment, tag
 
  // every route after this line will be authenticated witha token 
  app.use(controller.auth.authenticateToken);
  ////////////////////////////////////STORIES//////////////////////////////////////////
  app.get('/api/stories', controller.stories.getAll);


  app.get('/api/stories/:storyId', controller.stories.getOne);


  app.post('/api/:userId/stories', controller.stories.add);

  ////////////////////////////////////MOMENTS//////////////////////////////////////////
  app.post('/api/moments/:storyId', controller.moments.add);

  
  //might not need this going forward...
  app.get('/api/moments/:storyId', controller.moments.getAll);

  // app.get('/api/moments/:tagId', );
  // app.get('/api/tags', );
  // app.post('/api/tags', );
  // app.get('/api/comments', );
  // app.post('/api/comments/:momentId', );
  // app.get('/api/users', );
  // app.post('/api/users', );
};
