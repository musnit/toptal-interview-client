import Ember from 'ember';
import User from 'toptal-trip-planner-client/models/user';
import ENV from 'toptal-trip-planner-client/config/environment';

export default Ember.Controller.extend({
  actions: {
    signup: function(){
      var controller =  this;

      var user = this.get('store').createRecord('user', {
        email: this.get('email'),
        password: this.get('password'),
        password_confirmation: this.get('password')
      });
      user.save().then(function(user){
        controller.get('session').authenticate('simple-auth-authenticator:devise', {
          identification: user.get('username'),
          password: controller.get('password')
        });
      }, function(response){
        controller.set('errorMessage', response.message);
      });
    }
  }
});
