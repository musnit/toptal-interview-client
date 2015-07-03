import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'toptal-trip-planner-client/tests/helpers/start-app';
import Pretender from 'pretender';

var application, server;

module('Acceptance | authentication', {
  beforeEach: function() {
    application = startApp();
    server = new Pretender(function() {
      this.post('/users/sign_in', function(request) {
        var rb = request.requestBody;
        if ( rb.match(/password%5D=validpassword/) ) {
          var payload = {user_token: 'gvSkMer7hZpw9iZsBZ4r',
                         user_email: 'example@mail.com'};
          return [200, {'Content-Type': 'application/json'},
                  JSON.stringify(payload)];
        } else {
          return [401];
        }
      });
    });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('secret route is accessible when the session is authenticated', function(assert) {
  authenticateSession();
  visit('/secret');

  andThen(function() {
    assert.equal(currentRouteName(), 'secret');
  });
});

test('secret route is not accessible when the session is not authenticated', function(assert) {
  invalidateSession();
  visit('/secret');

  andThen(function() {
    assert.notEqual(currentRouteName(), 'secret');
  });
});

test("the current user is set in the session", function(assert) {
  assert.expect(1);
  authenticateSession();
  currentSession().set('currentUser', 'aidan');
  visit('/secret');

  andThen(function() {
    var user = currentSession().get('currentUser');
    assert.equal(user, 'aidan');
  });
});

test('test failed login', function(assert) {
  visit('/login');
  andThen(function() {
    fillIn('#email', 'example@mail.com');
    fillIn('#password', 'an invalid password');
    click('#submit');
  });

  andThen(function() {
    assert.equal(currentRouteName(), 'login');
  });
});

test('successful login redirects to secret route', function(assert) {
  visit('/login');
  andThen(function() {
    fillIn('#email', 'example@mail.com');
    fillIn('#password', 'validpassword');
    click('#submit');
  });
  andThen(function() {
    assert.equal(currentRouteName(), 'secret');
  });
});
