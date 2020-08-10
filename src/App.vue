<template>
  <div id="app">
    <router-view v-if="ready" />
  </div>
</template>

<script>
import Vue from "vue";
import { init, state } from "./chain";

export default {
  name: "App",
  data() {
    return {
      ready: false,
    };
  },
  async mounted() {
    try {
      const w3 = await init(["4"]);
      if (w3) {
        Vue.prototype.$web3 = w3;
        Vue.prototype.$account = state.account;
        this.ready = true;
      } else {
        console.log(state);
      }
    } catch (_) {
      console.log(state);
    }
  },
};
</script>
