/***
This is the only JS module gets loaded into base.html for User Interaction Tracking.
There are 3 events get tracked:

1. click -- clickQuery(e)
2. hover -- hoverQuery(e)
3. scroll -- scrollQuery(e)

The basicInfo() retrieves common data for each event.
Tracking data is sent to API endpoint "/ui_tracker" as query string of an image.
***/
const KolibriModule = require('kolibri_module');

class UITrackerModule extends KolibriModule {

  /* 
  gather basic info.
  */
  basicInfo() {
    return {
      time: Date.now(),
      facilityID: window.kolibriGlobal.coreVue.vuex.store.initialState.core.session.facility_id,
      userID: window.kolibriGlobal.coreVue.vuex.store.initialState.core.session.user_id,
      userName: window.kolibriGlobal.coreVue.vuex.store.initialState.core.session.username,
      userKind: window.kolibriGlobal.coreVue.vuex.store.initialState.core.session.kind,
      url: document.URL,
    };
  }

  /*
  construct query string.
  */
  query(data) { 
    return Object.keys(data).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
  }

  /*
  send back click tracking data.
  */
  clickQuery(e) {
    const data = this.basicInfo();
    data['targetClass'] = e['target'].className;
    data['targetID'] = e['target'].id;
    data['type'] = 'click';
    new Image().src = '/ui_tracker?' + this.query(data);
  }

  /*
  send back hover tracking data.
  */
  hoverQuery(e) {
    if (e['target'] instanceof SVGElement) {
      // because hover gets triggerd by sub svg elements like different pathes, ignore svg.
      return;
    }
    const data = this.basicInfo();
    data['targetClass'] = e['target'].className;
    data['targetID'] = e['target'].id;
    data['type'] = 'hover';
    console.log('dddd:::: ', data);
    new Image().src = '/ui_tracker?' + this.query(data);
  }

  /*
  track scroll state.
  */
  scrollState() {
    let didScroll = false;
    let scrollReached = 0;
    return{
      getDidScroll: function() {
        return didScroll;
      },
      setDidScroll: function(bool) {
        didScroll = bool;
      },
      getScrollReached: function() {
        return scrollReached;
      },
      setScrollReached: function(percent) {
        scrollReached = percent;
      }
    }
  }

  /*
  return scroll percentage at the step of 10 percent.
  e.g. percent = 7; return 0
       percent = 10; return 10
       percent = 19.999; return 10
  */
  scrollNormalizedPercent(element) {
    const st = 'scrollTop',
        sh = 'scrollHeight';
    const percent = element[st] / (element[sh] - element.clientHeight) * 100;
    return parseInt(percent / 10, 10) * 10;
  }

  /*
  send back scroll tracking data.
  */
  scrollQuery(element, scrollState) {
    // increment at the step of 10 percent to avoid requesting too frequently.
    const normalized = this.scrollNormalizedPercent(element);
    if (scrollState.getScrollReached() < normalized) {
      scrollState.setScrollReached(normalized)
      const data = this.basicInfo();
      data['targetClass'] = element.className;
      data['targetID'] = element.id;
      data['type'] = 'scroll';
      data['percant'] = normalized;
      new Image().src = '/ui_tracker?' + this.query(data);
    }
  }

  /*
  inherited callback when this module is initialized.
  */
  initialize() {
    console.log('inininininin:::: ');
  }

  /*
  inherited callback when this module is loaded.
  */
  ready() {
    const clickQuery = this.clickQuery;
    const hoverQuery = this.hoverQuery;
    const scrollQuery = this.scrollQuery;
    const scrollState = this.scrollState();
    let scrollTrackElement_1;
    const that = this;
    document.onclick = function(e) {
      clickQuery.apply(that, [e]);
    };
    document.onmouseover = function(e) {
      hoverQuery.apply(that, [e]);
    }

    // seems this ready() is not real ready yet.
    const loading = setInterval(function() {
      if (document.getElementsByClassName('main-wrapper')[0]) {
        scrollTrackElement_1 = document.getElementsByClassName('main-wrapper')[0];
        scrollTrackElement_1.onscroll = function(e) {
          scrollState.setDidScroll(true);
        };
        clearInterval(loading);
      }
    }, 500);

    //limit the calls to scrollQuery at 100 ms per call on scroll
    setInterval(function() {
      if(scrollState.getDidScroll()) {
        scrollState.setDidScroll(false);
        scrollQuery.apply(that, [scrollTrackElement_1, scrollState]);
      }
    }, 100);
  }
}

module.exports = new UITrackerModule();
