var seedDb = require('./config/dummydata');

module.exports = function (grunt) {
  /////////////////////////////////////////////////////////////////////////////
  // Main Grunt Tasks
  /////////////////////////////////////////////////////////////////////////////

  grunt.registerTask('seedDb', function () {
    done = this.async();
    return seedDb()
    .then(function(){
      done();
    })
    .catch(function(error){
      grunt.log.writeln("error in calling seedDb (Guntfile.js line 14): ", error);
      return false;
    })
  });
}
