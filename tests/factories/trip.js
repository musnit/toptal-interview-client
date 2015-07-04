import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('trip', {
  sequences: {
    destination: function(num) {
      return 'Destination' + num;
    }
  },

  default: {
    destination: FactoryGuy.generate('destination'),
    comment: 'yoyoyo',
    startDate: 'umm',
    endDate: 'ok',
    user: {}
  }
});

export default {};
