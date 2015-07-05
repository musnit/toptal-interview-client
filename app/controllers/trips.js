import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteTrip: function(trip){
      trip.deleteRecord();
      trip.save();
    }
  }
});
