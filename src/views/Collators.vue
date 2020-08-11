<template>
  <div class="page">
    <h1>We invite independent collators for testing now!</h1>
    <div>
      <p>
      <b>Attention please!</b> Updates from 10 August 2020. Robonomics Core developers team want to prevent unlimited farming from 11 august, and now collators must stake some Robonomics tokens to be whitelisted in testnet collators and be rewarded weekly with 10 XRT. 
       Collators staking smart contract has the limit of 250 addresses and amount XRT required for staking will increase with [following formula on WolframAlpha](https://www.wolframalpha.com/input/?i=plot+5+*+250+%2F+%28250+-+x+%2B+1%29%2C+x+%3D+0..250%2C+y+%3D+0..100). 
      </p>
      <p>
        Follow the link <a href="https://docs.google.com/forms/d/e/1FAIpQLSc3sDbeQbD_gah6kntlI9jGnYvT6nJyGyQkpQU4QPTXzC0w-Q/viewform">
        Telemetry participants of Robonomics Parachain</a> and
        please put the name you will use in Robonomics telemetry and your
        ethereum mainnet address. Once a week we will reward you with 10 XRT (in
        case your collator is up and running 24/7).
      </p>
      <p>
        Build the parachain collator from the latest release of robonomics:<br />
        <a
          href="https://github.com/airalab/robonomics/releases">Robonomics releases on GitHub</a
        >
      </p>
      <p>
        See build instructions on GitHub:<br />
        <a href="https://github.com/airalab/robonomics#the-robonomics-framework">Robonomics Readme</a
        >
      </p>
      <p>
        See step-by-step build instructions on Medium:<br />
        <a href="https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567"
          >Installing and running the Robonomics parachain collator</a
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
