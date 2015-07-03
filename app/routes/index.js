import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});
