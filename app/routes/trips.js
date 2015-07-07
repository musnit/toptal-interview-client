import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    if (this.session.content.secure.role === 'admin'){
      this.store.unloadAll('trip');
    }
    return this.store.findAll('trip');
  }
});
