import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'toptal-trip-planner-client/tests/helpers/start-app';
import tripFactory from '../factories/trip';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import FactoryGuy from 'ember-data-factory-guy';

var application, server;

module('Acceptance | Trip Page', {
  beforeEach: function() {
    application = startApp();
    var trips = FactoryGuy.makeList('trip', 2);
    TestHelper.handleFindQuery('trip', trips);
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    Ember.run(FactoryGuy, 'clearStore');
    TestHelper.teardown();
  }
});

test('trip route is accessible when the session is authenticated', function(assert) {
  authenticateSession();
  visit('/trips/1');

  andThen(function() {
    assert.equal(currentRouteName(), 'trip');
  });
});

test('trip route is not accessible when the session is not authenticated', function(assert) {
  invalidateSession();
  visit('/trips/1');

  andThen(function() {
    assert.notEqual(currentRouteName(), 'trip');
  });
});

test('trip destination should be shown on the page', function(assert) {
  authenticateSession();
  visit('/trips/1');
  andThen(function() {
    assert.equal(find('#destination').text(), 'Destination1');
  });
});

test('trips should have a delete button to remove them', function(assert) {
  authenticateSession();
  visit('/trips/1');
  andThen(function() {
    assert.ok(find('.delete-trip-button'));
  });
});

test('deleting a trip should redirect to the trips page', function(assert) {
  assert.expect(1);
  TestHelper.handleDelete('trip', 1);
  authenticateSession();
  visit('/trips/1');
  andThen(function() {
    click('.delete-trip-button:first');
  });
  andThen(function() {
    assert.equal(currentRouteName(), 'trips');
  });
});

test('clicking on a delete button should delete that trip', function(assert) {
  assert.expect(2);
  TestHelper.handleDelete('trip', 1);
  authenticateSession();
  visit('/trips/1');
  andThen(function() {
    click('.delete-trip-button:first');
  });
  andThen(function() {
    assert.equal($.mockjax.mockedAjaxCalls().length, 2);
    assert.equal(find('.delete-trip-button').length, 1);
  });
});
