var controller = require('../controllers');
var request = require('request');


module.exports = function(app) {

  app.get('/', function (req, res) {

  });

  ////////////////////////////////////USERS//////////////////////////////////////////
  // app.post('/api/signin', );
  // app.post('/api/signup', );
  // app.get('/api/recent', );

  //actions that will ultimately affect users:
  //sign up 
    //add user info to database (including password and name etc.)

  //sign in 
    //verify whether or not user exists
      //if so, create a session
      //if not, direct user to sign in page
  
  //log out
    //destroy session
    //route user to sign in page
  
  //get one story for a given user
    //needs to include all users for the story as well as tags/comments for that story
  
  //get all stories for a given user
    //needs to include all users for each of those stories
    //eventually needs to include all moments tags and comments
  
  //create a new story
    //need to be able add users to story
  
  //create a new moment
    //need to be able to add a comment, tag, and existing users
  
  //get a moment
    //need to be able to view a comment, tag, and existing users

  ////////////////////////////////////STORIES//////////////////////////////////////////
  app.get('/api/stories', controller.stories.getAll);


  app.get('/api/stories/:storyId', controller.stories.getOne);


  app.post('/api/stories', controller.stories.add);

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
