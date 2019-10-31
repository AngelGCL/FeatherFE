import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import AOS from 'aos';
import VueParticles from 'vue-particles';
import VueResource from 'vue-resource';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'aos/dist/aos.css';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faUserPlus, faChartBar, faPlus, faUserGraduate, faSearch, faUserCircle, faTachometerAlt, faBuilding, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import 'vue-search-select/dist/VueSearchSelect.css'
import store from '../store/index';

library.add(faUserPlus);
library.add(faChartBar);
library.add(faSearch);
library.add(faUserCircle);
library.add(faTachometerAlt);
library.add(faBuilding);
library.add(faUserGraduate);
library.add(faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuelidate);
Vue.use(Vuex);
Vue.use(VueParticles);
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  created() {
    AOS.init();
  },
  router,
  store,
  validations: {},
  render: h => h(App),
}).$mount('#app');
