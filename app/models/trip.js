import DS from 'ember-data';

export default DS.Model.extend({
  destination: DS.attr('string'),
  comment: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  user: DS.belongsTo('user'),
  tripIsInFuture: function(){
    return true;
  }.property('startDate'),
  daysUntilStart: function(){
    if(!this.get('tripIsInFuture')){
      return null;
    }
    else{
      return 12;
    }
  }.property('startDate', 'tripIsInFuture')
});
