import { moduleForModel, test } from 'ember-qunit';
import Trip from 'toptal-trip-planner-client/models/trip';
import Ember from 'ember';

moduleForModel('trip', 'Unit | Model | trip', {
  // Specify the other units that are required for this test.
  needs: ['model:user'],
  beforeEach: function() {

  },

  afterEach: function() {

  }
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('tripIsInFuture is true if trip is in future', function(assert) {
  var self = this;
  var trip;
  Ember.run(function(){
    trip = self.store().createRecord('trip',{});
    trip.set('startDate', '22 July');
  });
  assert.equal(trip.get('tripIsInFuture'), true);
});

test('tripIsInFuture is false if trip is in future', function(assert) {
  var self = this;
  var trip;
  Ember.run(function(){
    trip = self.store().createRecord('trip',{});
    trip.set('startDate', '5 July');
  });
  assert.equal(trip.get('tripIsInFuture'), false);
});

test('days until start is correct if trip is in future', function(assert) {
  var self = this;
  var trip;
  Ember.run(function(){
    trip = self.store().createRecord('trip',{});
    trip.set('startDate', '22 July');
  });
  assert.equal(trip.get('daysUntilStart'), 12);
});

test('days until start is null if trip is in past', function(assert) {
  var self = this;
  var trip;
  Ember.run(function(){
    trip = self.store().createRecord('trip',{});
    trip.set('startDate', '5 July');
  });
  assert.equal(trip.get('daysUntilStart'), null);
});
