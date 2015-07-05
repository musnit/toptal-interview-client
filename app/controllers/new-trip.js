import Ember from 'ember';

export default Ember.Controller.extend({
  newTrip: {},
  actions: {
    createTrip: function(newTrip){
      var controller = this;
      if(newTrip.destination === '' || newTrip.destination === undefined ){
        controller.set('errorMessage', "Hey your destination can't be blank!");
        return;
      }
      else{
        var trip = this.get('store').createRecord('trip', newTrip);
        trip.save().then(function(result){
          controller.transitionToRoute('trip', result.get('id'));
        }, function(response){
          //trip.deleteRecord();
          controller.set('errorMessage', response.message);
        });
      }
    }
  }
});
