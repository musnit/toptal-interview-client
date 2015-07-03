import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    authenticate: function(){
      var self = this;
      var data = {
        identification: this.get('email'),
        password: this.get('password')
      };
      this.get('session').authenticate('simple-auth-authenticator:devise', data).then(
        function(){},
        function(response){
          self.set('errorMessage', response.error);
      });
    }
  }
});
