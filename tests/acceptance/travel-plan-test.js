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

test('travel plan only includes trips that start or end within the next month', function(assert) {
  var trips = FactoryGuy.makeList('trip_with_dates_mixed_from_before_to_after', 5);
  TestHelper.handleFindAll('trip', trips);
  authenticateSession();
  visit('/travel_plan');
  andThen(function() {
    assert.equal(find('.plan-trip').length, 3);
  });
});
