const KolibriModule = require('kolibri_module');
const ExerciseComponent = require('./vue/index');

class UITrackerModule extends KolibriModule {

  get rendererComponent() {
    return ExerciseComponent;
  }

  // gather data somehow
  // data() {
  //   return {
  //     time: Date.now(),
  //     pixelRatio: window.devicePixelRatio
  //   };
  // }

  // // construct query string
  // query(data) { 
  //   return Object.keys(data).map(function(key){
  //     return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  //   }).join('&');
  // }

  // ready() {
  //   console.log('elielieli');
  //   new Image().src = '/uitrk.png?' + this.query(this.data()); // "/stats.png?time=1391976334544&pixelRatio=1"
  // }
}

module.exports = new UITrackerModule();
