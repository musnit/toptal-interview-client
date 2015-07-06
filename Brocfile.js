/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var concat = require('broccoli-concat');
var cleanCSS = require('broccoli-clean-css');

var app = new EmberApp();
app.import('vendor/bootstrap/bootstrap.css');

module.exports = app.toTree();
