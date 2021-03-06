import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    return this.store.find('user', params.user_id );
  },
  beforeModel: function() {
    if (this.get('session.secure.role') !== 'admin') {
      this.transitionTo('trips');
    }
  }
});
