// Contains all model interfaces, to be exported out for use by different server-side modules
module.exports = {
  comments: require('../comments/commentModel.js'),
  moments: require('../moments/momentModel.js'),
  stories: require('../stories/storyModel.js'),
  tags: require('../tags/tagModel.js'),
  users: require('../users/userModel.js')
};
