import Vue from "vue";
import VueHighcharts from "vue-highcharts";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueHighcharts);
Vue.filter("sliceAddress", function (text) {
  return text.slice(0, 6) + "..." + text.slice(-4);
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
