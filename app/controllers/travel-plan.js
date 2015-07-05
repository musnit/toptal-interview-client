import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['startDate'],
  sortAscending: true,
  tripsInTheNextMonth: function(){
    var now = Date.now();
    var nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    return this.get('content').filter(function(trip){
      return trip.get('endDate') >= now &&
             trip.get('startDate') <= nextMonth;
    });
  }.property('content.[]','content.@each.startDate','content.@each.endDate'),
  actions: {
    print: function(){
      window.print();
    }
  }
});
