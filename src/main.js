import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from "element-ui"
import Mint from 'mint-ui/lib/index'
import {request} from "./net/requets"


require("./utils/tools");
require("element-ui/lib/theme-chalk/index.css");
require("mint-ui/lib/style.css");

Vue.use(element);
Vue.use(Mint);

Vue.prototype.$request = config => request(config);
Vue.prototype.$mint = Mint;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
