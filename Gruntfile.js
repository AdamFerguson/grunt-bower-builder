/*
 * grunt-bower-builder
 * https://github.com/AdamFerguson/grunt-bower-builder
 *
 * Copyright (c) 2013 Adam Ferguson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
      bowerrc: ['.bowerrc']
    },

    copy: {
      bowerrc: {
        files: {
          src: ['test/fixtures/.bowerrc', 'test/fixtures/bower.json'],
          dest: '/'
        }
      }
    },

    // Configuration to be run (and then tested).
    bowerBuilder: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
        },
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!',
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  var bower = require('bower');

  grunt.registerTask('bowerInstall', 'Install bower dependencies based on .bowerrc config', function() {
    var done = this.async();
    bower.commands.install.line().
    on('error', function(data) { console.log(data); }).
    on('data', function(data) { console.log(data); }).
    on('end', function() {
      console.log('bower dependencies installed');
      done();
    });
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy','bowerInstall','bowerBuilder', 'nodeunit','clean:bowerrc']);


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
