var controller = require('../controllers');
var request = require('request');


module.exports = function(app) {

  app.get('/', function (req, res) {

  });

  ////////////////////////////////////USERS//////////////////////////////////////////

  //CLIENT SIDE ROUTES THAT WILL AFFECT/MAKE USE OF USER TABLE...

  //sign up
    //add user info to database (including password and name etc.)
  app.post('/api/users', controller.auth.createUser);

  //invited page
    //verify if identifer exists in db
      //if so ask for remaining user info and create a session
      //if not, direct to sign up page

  // get a token for the given user
    // this is a post request because we don't put username and
    // password in a url query
  app.post('/api/users/token', controller.auth.authenticateUser);

  // //log out
  //   //destroy session
  //   //route user to sign in page
  // app.get('/api/users/singout', controller.auth.logout);

  // every route after this line will be authenticated with a token
  app.use(controller.auth.authenticateToken);

  app.get('/api/users', controller.users.find);

  ////////////////////////////////////STORIES//////////////////////////////////////////

  //check if story is already associated to user (COMPLETED V1/CHECKED)
  //create a new moment (COMPLETED V1/CHECKED --> excluding functionality to add moment to multiple stories)
    //need to be able to add a comment, tag, AND potentially add a new user to a story??

  //add new or existing user to story
    //get all story for a existing users (COMPLETED V1 + CHECKED WITH NEW AUTHENTICATE TOKEN METHOD)
  app.post('/api/stories', controller.stories.add);


  //get one story for a given user (COMPLETED V1 + CHECKED WITH NEW AUTHENTICATE TOKEN METHOD)
    //needs to include all users for the story as well as tags/comments for that story
  app.get('/api/stories/:storyId', controller.stories.getOne);
  // don't use check, use getOne above
  // app.post('/api/stories/check', controller.stories.check);

  // This should be a GET stories below with a query in the URL
  // app.post('/api/tags/:storyId', controller.stories.filterByTag);

  //get all stories for a given user (COMPLETED V1 + CHECKED WITH NEW AUTHENTICATE TOKEN METHOD)
    //needs to include all users for each of those stories
    //eventually needs to include all moments tags and comments
  //NOTE: will need to refactor once we have access to sessions. for now using userId in req.params
  //TODO: this need to handle filter parameters in URL query string
  app.get('/api/stories', controller.stories.getAll);


  ////////////////////////////////////MOMENTS//////////////////////////////////////////

  app.post('/api/moments', controller.moments.add);

  //get all moments (probably don't need this going forward...)
  // inputs: storyid as input parameter
  app.get('/api/moments', controller.moments.getAll);

  //get one moment
  app.get('/api/moments/:momentId', controller.moments.getOne);

  ////////////////////////////////////TAGS//////////////////////////////////////////////

  // TODO: momentId should be a paramater in the post, since this is a post
  app.post('/api/tags/:momentId', controller.tags.add);

  // TODO storyid should be a url query parameter
  app.get('/api/tags/:storyId', controller.tags.getAllByStory);

  ///////////////////////////////////COMMENTS///////////////////////////////////////////

  app.get('/api/comments/:commentId', controller.comments.getOne);

  // get all of the comments by moment or by user
  // input: momentId or userId in url query
  // ouput: json array of comment objects
  app.get('/api/comments', controller.comments.getAll);

  // add a comment,
  // input: text and momentid on body, userid from auth token
  // output: json comment object
  app.post('/api/comments', controller.comments.addOne);

  ///////////////////////////////////UPDATES///////////////////////////////////////////

  //get the bathSize number of latest update
  app.get('/api/updates', controller.updates.getRecent);

};
