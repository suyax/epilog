var controller = require('../controllers');
var request = require('request');


module.exports = function(app) {
  ////////////////////////////////////USERS//////////////////////////////////////////

  //sign up
    //add user info to database
    // Inputs in JSON body:
      // email: new user's email also will be used as their identifier
      // password: new user's password
      // firstname: new user's first name
      // lastname: new user's last name
    // Output in a JSON object:
      // id: user's new id number
    // Error:
      // HTTP status 400
  app.post('/api/users', controller.auth.createUser);

  //TODO: invited page
    //verify if identifier exists in db
      //if so ask for remaining user info and create a session
      //if not, direct to sign up page

  // get a token for the given user
    // this is a post request because we don't put username and
    // password in a url query
    // Inputs in JSON body:
      // email: new user's email also will be used as their identifier
      // password: new user's password
    // Output in JSON body:
      // token: user's token
    // Error:
      // HTTP status 401
  app.post('/api/users/token', controller.auth.authenticateUser);

  // checks a token's validity
    // Input in request header:
      // token: the user token that needs to be validated
    // Output:
      // HTTP Status 200 success
    // Error:
      // HTTP Status 401 unauthorized
  app.get('/api/users/token', controller.auth.authenticateToken, function (req,res) {
    // the token was successfully authenticated.
    res.end()
  });

  // every route after this line will be authenticated with a token
  app.use(controller.auth.authenticateToken);

  ////////////////////////////////////USERS////////////////////////////////////

  app.get('/api/users', controller.users.find);

  ////////////////////////////////////STORIES//////////////////////////////////////////

  //add existing user to story
    // Input in JSON body:
      // title: new story's title
      // description: description of new story
      // existingUsersToInclude:
    // Output user Ids
  app.post('/api/stories', controller.stories.add);

  //get one story for a given user (COMPLETED V1 + CHECKED WITH NEW AUTHENTICATE TOKEN METHOD)
    //needs to include all users for the story as well as tags/comments for that story
  // app.get('/api/stories/:storyId', controller.stories.getOne);
  // don't use check, use getOne above
  // app.post('/api/stories/check', controller.stories.check);

  // This should be a GET stories below with a query in the URL
  // app.post('/api/tags/:storyId', controller.stories.filterByTag);

  //get all stories for a given user (COMPLETED V1 + CHECKED WITH NEW AUTHENTICATE TOKEN METHOD)
    //needs to include all users for each of those stories
    //eventually needs to include all moments tags and comments
  //NOTE: will need to re-factor once we have access to sessions. for now using userId in req.params
  app.get('/api/stories', controller.stories.getAll);


  ////////////////////////////////////MOMENTS//////////////////////////////////////////

  app.post('/api/moments', controller.moments.add);

  //get all moments (probably don't need this going forward...)
  // inputs: storyid as input parameter
  // app.get('/api/moments', controller.moments.getAll);

  //get one moment
  // app.get('/api/moments/:momentId', controller.moments.getOne);

  ////////////////////////////////////TAGS//////////////////////////////////////////////

  // TODO: turn momentId into a parameter in the post
  // adding tags to a moment
  app.post('/api/tags/:momentId', controller.tags.add);

  // TODO: turn storyid into url query parameter
  // getting tags to a story
  app.get('/api/tags/:storyId', controller.tags.getAllByStory);

  ///////////////////////////////////COMMENTS///////////////////////////////////////////

  // app.get('/api/comments/:commentId', controller.comments.getOne);

  // get all of the comments by moment or by user
  // input: momentId or userId in url query
  // ouput: json array of comment objects
  app.get('/api/comments', controller.comments.getAll);

  // add a comment,
  // input: text and momentid on body, userid from auth token
  // output: json comment object
  app.post('/api/comments', controller.comments.addOne);

  ///////////////////////////////////UPDATES///////////////////////////////////////////

  //get the bacthSize number of latest update
  // batchSize is a url query parameter that limits the number of updates returned
  app.get('/api/updates', controller.updates.getRecent);

};
