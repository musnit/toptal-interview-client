import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'toptal-trip-planner-client/tests/helpers/start-app';
import tripFactory from '../factories/trip';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import FactoryGuy from 'ember-data-factory-guy';

var application, server;

module('Acceptance | authentication', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    Ember.run(FactoryGuy, 'clearStore');
    TestHelper.teardown();
  }
});

test('trips route is accessible when the session is authenticated', function(assert) {
  authenticateSession();
  visit('/trips');

  andThen(function() {
    assert.equal(currentRouteName(), 'trips');
  });
});

test('trips route is not accessible when the session is not authenticated', function(assert) {
  invalidateSession();
  visit('/trips');

  andThen(function() {
    assert.notEqual(currentRouteName(), 'trips');
  });
});

test('trips should be listed on the page', function(assert) {
  TestHelper.handleFindAll('trip', 5);
  authenticateSession();
  visit('/trips');
  andThen(function() {
    assert.equal(find('.trip').length, 5);
  });
});

