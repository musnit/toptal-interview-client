import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveTrip: function(trip){
      var controller = this;
      if(trip.get('destination') === '' || trip.get('destination') === undefined ){
        controller.set('errorMessage', "Hey your destination can't be blank!");
        return;
      }
      if(trip.get('startDate') > trip.get('endDate')){
        controller.set('errorMessage', "Hey your start date has to be after your end date!");
        return;
      }
      else{
        trip.save().then(function(result){
          controller.set('errorMessage', undefined);
          controller.transitionToRoute('user', result.toJSON().user);
        }, function(response){
          controller.set('errorMessage', response.message);
        });
      }
    }
  }
});
