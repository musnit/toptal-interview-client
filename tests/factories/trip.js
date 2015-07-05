import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('trip', {
  sequences: {
    destination: function(num) {
      return 'Destination' + num;
    },
    startDate: function(num){
      var startDate = new Date();
      var dayChange = (-2 + num)*14;
      startDate.setDate(startDate.getDate() + dayChange);
      return startDate;
    },
    endDate: function(num){
      var endDate = new Date();
      var dayChange = (-1 + num)*14;
      endDate.setDate(endDate.getDate() + dayChange);
      return endDate;
    }
  },

  default: {
    destination: FactoryGuy.generate('destination'),
    comment: 'yoyoyo',
    startDate: 'umm',
    endDate: 'ok',
    user: {}
  },

  trip_with_dates_mixed_from_before_to_after: {
    destination: FactoryGuy.generate('destination'),
    comment: 'yoyoyo',
    startDate: FactoryGuy.generate('startDate'),
    endDate: FactoryGuy.generate('endDate'),
    user: {}
  }
});

export default {};
