import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';
import axios from "axios"

import "ant-design-vue/lib/alert/style/css";
import "ant-design-vue/lib/drawer/style/css";
import "ant-design-vue/lib/row/style/css";
import "ant-design-vue/lib/col/style/css";
import "ant-design-vue/lib/icon/style/css";
import "ant-design-vue/lib/button/style/css";

import {  Row, Col } from "ant-design-vue";

Vue.use(VueCompositionAPI)
Vue.use(VueToast);
Vue.config.productionTip = false
Vue.use(Col);

// Vue.use(Alert);
// Vue.use(Drawer);
Vue.use(Row);
// Vue.use(Icon);
// Vue.use(Button)

let token = window.sessionStorage.getItem("leyyow_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
