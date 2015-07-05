import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'toptal-trip-planner-client/tests/helpers/start-app';
import tripFactory from '../factories/trip';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import FactoryGuy from 'ember-data-factory-guy';

var application, server;

module('Acceptance | New Trip Page', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    Ember.run(FactoryGuy, 'clearStore');
    TestHelper.teardown();
  }
});

test("clicking create trip with a filled in name should redirect to that trip's page", function(assert) {
  TestHelper.handleCreate('trip');
  authenticateSession();
  visit('/trips/new');
  andThen(function() {
    fillIn('#destination-input', 'MyDestination');
  });
  andThen(function() {
    click('.create-trip-button');
  });
  andThen(function() {
    assert.equal(currentRouteName(), 'trip');
  });
});

test('clicking create trip a trip with a filled in name should create that trip', function(assert) {
  TestHelper.handleCreate('trip');
  authenticateSession();
  visit('/trips/new');
  andThen(function() {
    fillIn('#destination-input', 'MyDestination');
  });
  andThen(function() {
    click('.create-trip-button');
  });
  andThen(function() {
    visit('/trips');
  });
  andThen(function() {
    assert.equal(find('.trip').length, 1);
  });
});

