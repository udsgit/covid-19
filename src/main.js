import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleCharts from 'vue-google-charts';
import VCalendar from 'v-calendar';
import 'jquery/src/jquery.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import copiaJSON from '@/copia.json';
import 'flag-icon-css/css/flag-icon.css';

Vue.use(copiaJSON);
Vue.use(VCalendar, { componentPrefix: 'vc' } );
Vue.use(VueGoogleCharts);


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
