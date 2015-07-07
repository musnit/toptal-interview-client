import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    return this.store.findAll('user');
  },
  beforeModel: function() {
    if (this.get('session.secure.role') !== 'admin' && this.get('session.secure.role') !== 'user_manager') {
      this.transitionTo('trips');
    }
  }
});
