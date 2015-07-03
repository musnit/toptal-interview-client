import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    authenticate: function(){
      var data = {
        identification: this.get('email'),
        password: this.get('password')
      }
      this.get('session').authenticate('simple-auth-authenticator:devise', data);
    }
  }
});
