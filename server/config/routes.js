var controller = require('../controllers');
var request = require('request');


module.exports = function(app) {

  app.get('/', function (req, res) {

  });

  // app.post('/api/signin', );
  // app.post('/api/signup', );
  // app.get('/api/recent', );
  
  app.get('/api/stories', controller.stories.getAllStories);


  app.get('/api/stories/:id', function (req, res) {

  });


  app.post('/api/stories/:title', function (req, res) {

  });


  app.post('/api/moments/:storyId', controller.moments.addMoment);


  app.get('/api/moments/:storyId', controller.moments.getAllMoments);

  // app.get('/api/moments/:tagId', );
  // app.get('/api/tags', );
  // app.post('/api/tags', );
  // app.get('/api/comments', );
  // app.post('/api/comments/:momentId', );
  // app.get('/api/users', );
  // app.post('/api/users', );
};
