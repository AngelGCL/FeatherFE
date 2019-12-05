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

import { faUniversity, faTrashAlt, faEdit, faAt, faLock, faSuitcase, faUserPlus, faChartBar, faPlus, faUserGraduate, faSearch, faUserCircle, faTachometerAlt, faBuilding, faEnvelope, faExternalLinkSquareAlt, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import 'vue-search-select/dist/VueSearchSelect.css';
import store from '../store/index';
import Axios from 'axios';
import Multiselect from 'vue-multiselect';

library.add(faUserPlus);
library.add(faExternalLinkSquareAlt);
library.add(faEnvelope);
library.add(faAt);
library.add(faLock);
library.add(faSuitcase);
library.add(faChartBar);
library.add(faSearch);
library.add(faUserCircle);
library.add(faTachometerAlt);
library.add(faBuilding);
library.add(faUserGraduate);
library.add(faPlus);
library.add(faEdit);
library.add(faUniversity);
library.add(faTrashAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('multiselect', Multiselect);

Vue.use(Vuelidate);
Vue.use(Vuex);
Vue.use(VueParticles);
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.$http = Axios;
const token = localStorage.getItem('token')
Vue.$http.defaults.headers.common['Content-type'] = 'application/json';
if (token) {
  Vue.$http.defaults.headers.common['token'] = token;
}

new Vue({
  created() {
    AOS.init();
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app');
