# grunt-bower-builder

> Build asset files from bower dependencies

This plugin allows you to take bower dependencies, as specified in a `bower.json` file,
and concatenate them in to a single file based on the dependency order. 

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bower-builder --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-builder');
```

## The "bowerBuilder" task

### Overview
In your project's Gruntfile, add a section named `bowerBuilder` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bowerBuilder: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

### Usage Examples

#### Default Options
In this example, the default options are used to build a concatenated file for each asset type
found by `bower list --sources`

```js
grunt.initConfig({
  bowerBuilder: {
    dev: {
      '.js': 'dest/built.js',
      '.css': 'dest/built.css'
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
