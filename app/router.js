import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('trips', { path: '/trips' });
  this.route('new_trip', { path: '/trips/new' });
  this.route('trip', { path: '/trips/:trip_id' });
  this.route('travel_plan');
});

export default Router;
