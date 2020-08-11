<template>
  <div class="page">
    <h1>We invite independent collators for testing now!</h1>
    <div>
      <p>
        Follow the link Telemetry participants of Robonomics Parachain and
        please put the name you will use in Robonomics telemetry and your
        ethereum mainnet address. Once a week we will reward you with 10 XRT (in
        case your collator is up and running 24/7).
      </p>
      <p>
        Build the parachain collator from the tag:<br />
        <a
          href="https://github.com/airalab/robonomics/releases/tag/v0.18.4-parachain"
          >https://github.com/airalab/robonomics/releases/tag/v0.18.4-parachain</a
        >
      </p>
      <p>
        See build instructions in the Readme:<br />
        <a href="https://github.com/airalab/robonomics#the-robonomics-framework"
          >https://github.com/airalab/robonomics#the-robonomics-framework</a
        >
      </p>
      <p>
        Run:<br />
        <code lang="sh"
          >./robonomics --chain parachain --port 30363 --name
          "_YOUR_NAME_FROM_GOOGLE_FORM_"</code
        >
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <h2>Stake</h2>
        <Signal v-if="$account" />
        <div v-else><button @click="connect">connect account</button></div>
      </div>

      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRpSXinniUIYVr37zWXJDG8PXGY9Xpl0iLLCaBE-ZWUBRHO45pw7wPF6_rQThpqKbE_0cleMy57-18R/pubhtml?gid=1991395529&amp;single=true&amp;widget=true&amp;headers=false"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Signal from "../components/Signal.vue";
import { accessAccount, state } from "../chain";

export default {
  components: {
    Signal,
  },
  methods: {
    async connect() {
      try {
        await accessAccount();
      } catch (_) {
        console.log(state);
      }
    },
  },
};
</script>

<style scoped>
.page {
  width: 1024px;
  margin: 0 auto;
}
h1 {
  text-align: center;
}
iframe {
  width: 100%;
  height: 500px;
}
</style>
