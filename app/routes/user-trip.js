import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    return this.store.find('trip', params.trip_id );
  },
  afterModel: function(model){
    return this.store.find('user', model.toJSON().user);
  }
});
