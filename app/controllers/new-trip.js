import Ember from 'ember';

export default Ember.Controller.extend({
  newTrip: {},
  actions: {
    createTrip: function(newTrip){
      var controller = this;
      var trip = this.get('store').createRecord('trip', newTrip);
      trip.save().then(function(result){
        console.log(result);
        //self.transitionTo('')
      }, function(response){
        controller.set('errorMessage', response.message);
      });
    }
  }
});
