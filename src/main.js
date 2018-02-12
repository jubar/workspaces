// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ToggleButton from 'vue-js-toggle-button';
import App from './App';

Vue.use(ToggleButton);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
