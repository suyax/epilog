var controller = require('../controllers');
var request = require('request');


module.exports = function(app) {

  app.get('/', function (req, res) {

  });

  ////////////////////////////////////USERS//////////////////////////////////////////

  //CLIENT SIDE ROUTES THAT WILL AFFECT/MAKE USE OF USER TABLE...

  //sign up
    //add user info to database (including password and name etc.)
  app.post('/api/users/signup', controller.auth.createUser);

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

  //ROUTES THAT SHOULDN'T AFFECT USERS...but may want to think about this more...
  //get a moment
    //need to be able to view a comment, tag

  // every route after this line will be authenticated with a token
 
  app.post('/api/stories/check', controller.stories.check);
  // every route after this line will be authenticated with a token 
  app.use(controller.auth.authenticateToken);


  ////////////////////////////////////STORIES//////////////////////////////////////////


  //check if story is already associated to user (COMPLETED V1/CHECKED)
  //create a new moment (COMPLETED V1/CHECKED --> excluding functionality to add moment to multiple stories)
    //need to be able to add a comment, tag, AND potentially add a new user to a story??
  // app.post('/api/stories/check', controller.stories.check);

  //add new or existing user to story
    //existing users (COMPLETED V1 + CHECKED WITH NEW AUTHENTICATE TOKEN METHOD)
  app.post('/api/stories', controller.stories.add);
  
  //get one story for a given user (COMPLETED V1 + CHECKED WITH NEW AUTHENTICATE TOKEN METHOD)
    //needs to include all users for the story as well as tags/comments for that story
  app.get('/api/stories/:storyId', controller.stories.getOne);
  
  //get all stories for a given user (COMPLETED V1 + CHECKED WITH NEW AUTHENTICATE TOKEN METHOD)
    //needs to include all users for each of those stories
    //eventually needs to include all moments tags and comments
  //NOTE: will need to refactor once we have access to sessions. for now using userId in req.params
  app.get('/api/stories', controller.stories.getAll);
  
  ////////////////////////////////////MOMENTS//////////////////////////////////////////
  
  //(COMPLETED V1 + CHECKED WITH NEW AUTHENTICATE TOKEN METHOD)
  app.post('/api/moments/', controller.moments.add);

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
