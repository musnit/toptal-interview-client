import Ember from 'ember';

export default Ember.Controller.extend({
  allDestinations: Ember.computed.mapBy('model', 'destination'),
  uniqueDestinations: Ember.computed.uniq('allDestinations'),
  destinationFilter: null,
  startAfterFilter: null,
  endBeforeFilter: null,
  destinationFilteredTrips: function(){
    if(this.get('destinationFilter')){
      return this.get('model').filterBy('destination', this.get('destinationFilter'));
    }
    else{
      return this.get('model');
    }
  }.property('model.[]','model.@each.destination','destinationFilter'),
  startAfterFilteredTrips: function(){
    var controller = this;
    if(this.get('startAfterFilter') && this.get('startAfterFilter') !== '' ){
      return this.get('destinationFilteredTrips').filter(function(trip){
        return trip.get('startDate') >= controller.get('startAfterFilter');
      });
    }
    else{
      return this.get('destinationFilteredTrips');
    }
  }.property('destinationFilteredTrips.[]','destinationFilteredTrips.@each.startDate','startAfterFilter'),
  endBeforeFilteredTrips: function(){
    var controller = this;
    if(this.get('endBeforeFilter') && this.get('endBeforeFilter') !== '' ){
      return this.get('startAfterFilteredTrips').filter(function(trip){
        return trip.get('endDate') <= controller.get('endBeforeFilter');
      });
    }
    else{
      return this.get('startAfterFilteredTrips');
    }
  }.property('startAfterFilteredTrips.[]','startAfterFilteredTrips.@each.endDate','endBeforeFilter'),
  allFilteredTrips: function(){
    return this.get('endBeforeFilteredTrips');
  }.property('endBeforeFilteredTrips.[]'),
  actions: {
    deleteTrip: function(trip){
      trip.deleteRecord();
      trip.save();
    },
    clearFilters: function(){
      this.set('endBeforeFilter', null);
      this.set('startAfterFilter', null);
      this.set('destinationFilter', null);
    }
  }
});
