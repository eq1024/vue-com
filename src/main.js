import Vue from "vue";
import App from "./App.vue";
// import uploader from "./components/eq-uploader"
// import player from "./components/eq-player"

import eq from "./components/index"

import './main.css'

Vue.config.productionTip = false;
// Vue.use(player)
// Vue.use(uploader)
Vue.use(eq)


new Vue({
  render: h => h(App)
}).$mount("#app");
