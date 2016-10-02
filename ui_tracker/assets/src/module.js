const KolibriModule = require('kolibri_module');

class UITrackerModule extends KolibriModule {

  // gather basic info.
  basicInfo() {
    return {
      time: Date.now(),
      facilityID: window.kolibriGlobal.coreVue.vuex.store.initialState.core.session.facility_id,
      userID: window.kolibriGlobal.coreVue.vuex.store.initialState.core.session.user_id,
      userName: window.kolibriGlobal.coreVue.vuex.store.initialState.core.session.username,
      userKind: window.kolibriGlobal.coreVue.vuex.store.initialState.core.session.kind,
    };
  }

  // construct query string.
  query(data) { 
    return Object.keys(data).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
  }

  // send back click tracking data. 
  clickQuery(e) {
    const data = this.basicInfo();
    data['targetClass'] = e['target'].className;
    data['targetID'] = e['target'].id;
    data['type'] = 'click';
    console.log('dddd:::: ', data);
    new Image().src = '/ui_tracker.png?' + this.query(data);
  }

  // inherited callback when this module is initialized.
  initialize() {
    console.log('inininininin:::: ');
  }

  // inherited callback when this module is loaded.
  ready() {
    const clickQuery = this.clickQuery;
    const that = this;
    document.onclick = function(e) {
      window.eli = e;
      clickQuery.apply(that, [e]);
    };
  }
}

module.exports = new UITrackerModule();
