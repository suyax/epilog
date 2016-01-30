// Contains the controllers exported from all tables
module.exports = {
  comments: require('../comments/commentController.js'),
  moments: require('../moments/momentController.js'),
  stories: require('../stories/storyController.js'),
  auth: require('../auth/authController.js'),
  tags: require('../tags/tagController.js'),
  users: require('../users/userController.js')
};
