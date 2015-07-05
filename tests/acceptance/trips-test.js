import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'toptal-trip-planner-client/tests/helpers/start-app';
import tripFactory from '../factories/trip';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import FactoryGuy from 'ember-data-factory-guy';

var application, server;

module('Acceptance | Trips Page', {
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

test('trips should have a delete button to remove them', function(assert) {
  TestHelper.handleFindAll('trip', 5);
  authenticateSession();
  visit('/trips');
  andThen(function() {
    assert.equal(find('.delete-trip-button').length, 5);
  });
});

test('clicking on a delete button should delete that trip', function(assert) {
  assert.expect(2);
  TestHelper.handleFindAll('trip', 5);
  TestHelper.handleDelete('trip', 1);
  authenticateSession();
  visit('/trips');
  andThen(function() {
    click('.delete-trip-button:first');
  });
  andThen(function() {
    assert.equal($.mockjax.mockedAjaxCalls().length, 2);
    assert.equal(find('.delete-trip-button').length, 4);
  });
});

