import Ember from 'ember';
import ENV from 'toptal-trip-planner-client/config/environment';

export default Ember.Controller.extend({
  host: ENV.serverHost,
  serverNamespace: ENV.serverNamespace,
  actions: {
    signup: function(){
      var controller =  this;

      var user = {
        email: this.get('email'),
        password: this.get('password'),
      };
      Ember.$.post(this.get('host') + this.get('serverNamespace') + '/users', {user: user}).then(function(){
        var data = {
          identification: controller.get('email'),
          password: controller.get('password')
        };
        controller.get('session').authenticate('simple-auth-authenticator:devise', data);
      }, function(response){
        controller.set('errorMessage', response.statusText);
      });
    }
  }
});
