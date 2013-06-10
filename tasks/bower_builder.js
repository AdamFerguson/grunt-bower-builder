/*
 * grunt-bower-builder
 * https://github.com/AdamFerguson/grunt-bower-builder
 *
 * Copyright (c) 2013 Adam Ferguson
 * Licensed under the MIT license.
 */

'use strict';

var bower = require('bower');
var lodash = require('lodash');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bowerBuilder', 'Build asset files from bower dependencies.', function() {
    var done = this.async();
    var self = this;

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: ';'
    });

    bower.commands.list({sources: true}).
      on('data', function(data) {
        console.log(data);
        lodash.keys(data).forEach(function(fileExt) {
          var src = data[fileExt].filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }
          }).map(function(filepath) {
            // Read file source.
            return grunt.file.read(filepath);
          }).join(grunt.util.normalizelf(options.separator));

          // Write the destination file.
          grunt.file.write(self.data[fileExt], src);

          // Print a success message.
          grunt.log.writeln('File "' + self.data[fileExt] + '" created.');
        }); // lodash.keys

        done();
      });

  });
};
