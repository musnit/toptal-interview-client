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

test('creating a trip with a filled in name should create that trip', function(assert) {
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

