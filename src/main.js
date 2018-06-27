import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import Icon from 'vue-awesome/components/Icon';
import {Tabs, Tab} from 'vue-tabs-component';
import VueLazyload from 'vue-lazyload'
import 'vue-awesome/icons';

Vue.use(require('vue-moment'));
Vue.use(VueLazyload);

Vue.component('icon', Icon);
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


(function() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
})();
