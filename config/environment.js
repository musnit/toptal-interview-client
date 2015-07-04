/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'toptal-trip-planner-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    serverNamespace: '',
    contentSecurityPolicy: {
      'connect-src': "'self' http://localhost:3000 https://toptaltripplanner.herokuapp.com/",
    },
    'simple-auth': {
      authorizer: 'simple-auth-authorizer:devise',
      crossOriginWhitelist: ['http://localhost:3000','https://toptaltripplanner.herokuapp.com/'],
      store: 'simple-auth-session-store:local-storage',
      routeAfterAuthentication: 'trips'
    },
    'simple-auth-devise': {
      identificationAttributeName: 'email'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['simple-auth-devise'].serverTokenEndpoint = 'http://localhost:3000/users/sign_in';
    ENV.serverHost= 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV['simple-auth'].store = 'simple-auth-session-store:ephemeral';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV['simple-auth-devise'].serverTokenEndpoint = 'https://toptaltripplanner.herokuapp.com/users/sign_in';
    ENV.serverHost= 'https://toptaltripplanner.herokuapp.com';
  }

  return ENV;
};
