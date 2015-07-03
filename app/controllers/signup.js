import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    signup: function(){
      var controller =  this;

      var user = this.get('store').createRecord('user', {
        email: this.get('email'),
        password: this.get('password'),
      });
      user.save().then(function(){
        var data = {
          identification: controller.get('email'),
          password: controller.get('password')
        };
        controller.get('session').authenticate('simple-auth-authenticator:devise', data);
      }, function(response){
        controller.set('errorMessage', response.message);
      });
    }
  }
});
