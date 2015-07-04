import { moduleForModel, test } from 'ember-qunit';

moduleForModel('trip', 'Unit | Model | trip', {
  // Specify the other units that are required for this test.
  needs: ['user']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
