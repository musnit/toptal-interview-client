import Ember from 'ember';

export default Ember.Controller.extend({
  userIsAdmin: Ember.computed.equal('session.secure.role','admin'),
  userIsUserManager: Ember.computed.equal('session.secure.role','user_manager'),
  actions: {
    deleteUser: function(user){
      user.deleteRecord();
      user.save();
    }
  }
});
