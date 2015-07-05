import { moduleForModel, test } from 'ember-qunit';
import Trip from 'toptal-trip-planner-client/models/trip';
import Ember from 'ember';

moduleForModel('trip', 'Unit | Model | trip', {
  // Specify the other units that are required for this test.
  needs: ['model:user'],
  beforeEach: function() {
    this.OriginalDateNow = Date.now;
    Date.now = function(){
      return new Date('July 15 2014');
    };
  },

  afterEach: function() {
    Date.now = this.OriginalDateNow;
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
    trip.set('startDate', new Date('17 July 2014'));
  });
  assert.equal(trip.get('tripIsInFuture'), true);
});

test('tripIsInFuture is false if trip is in past', function(assert) {
  var self = this;
  var trip;
  Ember.run(function(){
    trip = self.store().createRecord('trip',{});
    trip.set('startDate', new Date('15 July 2014'));
  });
  assert.equal(trip.get('tripIsInFuture'), false);
});
