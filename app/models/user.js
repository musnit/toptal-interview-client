import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  role: DS.attr('string'),
  trips: DS.hasMany('trip', { async: true } ),
  actualRole: function(){
    if (this.get('role')){
      return this.get('role');
    }
    return 'basic';
  }.property('role')
});
