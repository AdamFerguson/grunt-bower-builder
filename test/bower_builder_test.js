'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.bower_builder = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var actualJS = grunt.file.read('tmp/built.js');
    var expectedJS = grunt.file.read('test/expected/built.js');
    test.equal(actualJS, expectedJS, 'Compiled JS file should match the expected JS file.');

    var actualCSS = grunt.file.read('tmp/built.css');
    var expectedCSS = grunt.file.read('test/expected/built.css');
    test.equal(actualJS, expectedJS, 'Compiled CSS file should match the expected CSS file.');

    test.done();
  }
};
