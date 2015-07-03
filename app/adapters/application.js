import DS from "ember-data";
import ENV from 'toptal-trip-planner-client/config/environment';

export default DS.ActiveModelAdapter.extend({
  host: ENV.serverHost,
  namespace: ENV.serverNamespace
});
