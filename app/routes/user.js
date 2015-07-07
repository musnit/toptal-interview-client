import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ENV from 'toptal-trip-planner-client/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  host: ENV.serverHost,
  namespace: ENV.serverNamespace,
  model: function(params){
    return this.store.find('user', params.user_id );
  },
  beforeModel: function(transition) {
    if (this.get('session.secure.role') !== 'admin') {
      this.transitionTo('trips');
    }
  }
});
