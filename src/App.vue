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
    const account = Vue.observable({ account: null });
    Object.defineProperty(Vue.prototype, "$account", {
      get() {
        return account.account;
      },
      set(value) {
        account.account = value;
      },
    });

    try {
      const w3 = await init(["1"], (state) => {
        if (state.error) {
          this.ready = false;
        } else {
          this.$account = state.account;
        }
      });
      if (w3) {
        Vue.prototype.$web3 = w3;
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
