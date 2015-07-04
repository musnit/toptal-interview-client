import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.resource('trips', { path: '/trips' });
  this.resource('new_trip', { path: '/trips/new' });
  this.resource('trip', { path: '/trips/:trip_id' });
});

export default Router;
