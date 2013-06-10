/*
 * grunt-bower-builder
 * https://github.com/AdamFerguson/grunt-bower-builder
 *
 * Copyright (c) 2013 Adam Ferguson
 * Licensed under the MIT license.
 */

'use strict';

var bower = require('bower');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bowerBuilder', 'Build asset files from bower dependencies.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    var done = this.async();
    bower.commands.list({sources: true}).
      on('data', function(data) { console.log(data); }).
      on('error', function(data) { console.log(data); }).
      on('list', function(data) { console.log(data); }).
      on('end', function() { done(); });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
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

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
