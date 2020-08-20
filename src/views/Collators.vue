<template>
  <div class="page">
    <h1>We invite independent collators for testing now!</h1>
    <div>
      <h3>Robonomics parachain testnet incentive program, part 2.</h3>
      <br />
      <p>
        A month has passed since the start of the testnet incentive program. The
        first month helped form the provider community, and now we believe it is
        time to move on to the next stage of development, specifically the
        implementation of documentation, tools for providers, as well as making
        load tests on the network.
      </p>

      <p>
        The DAO of the project developers have agreed to allocate up to 5,000
        XRT to support community members for the next 2 months prior to the
        launch of Robonomics CC1 (see the article:
        <a
          href="https://blog.aira.life/foundation-of-the-robonomics-parachain-390dfac09e5d"
          target="_blank"
          >Foundation of the Robonomics parachain</a
        >).
      </p>

      <p>Already selected contests for the community.</p>

      <p>
        Technical writer. from 5 to 50 XRT for each published instruction /
        useful article on the operation of the network provider, verified by the
        chat admin until mid-October 2020.
      </p>

      <p>
        Network load tests using the Robonomics parachain functions datalog (),
        launch () - 50 - 250 XRT for a test performed with a load of 100,000+
        txs. 100 - 500 XRT for a test carried out with a load of 1,000,000+ txs
        with at least 10 concurrent nodes.
      </p>

      <p>
        Useful tool - 25 - 500 XRT for any bot useful for telegrams or riot /
        element, any published grafana setup.
      </p>

      <p>
        And finally, regarding the replacement of the telemetry support program.
      </p>

      <p>
        <b>Terms</b>:<br />The reward pool of 1000 XRT per month is distributed
        evenly across all nodes, which means that we do not restrict collator
        farms in any way if they meet the node requirements. Google form,
        staking contract and whitelist are canceled, you just specify the
        address in the telemetry name.
      </p>
      <br />
      <p>
        <b>Requirements for nodes</b>:<br /><br />
        <ul>
          <li>each node with an individual IP</li>
          <li>uptime > 90%</li>
          <li>full sync</li>
        </ul>
      </p>
      <br />
      <p>
        <b>Instructions</b>:<br />Launch a robonomics collator with a full Ethereum
        address for reward as follows:<br />
        <code lang="sh">robonomics --validator --name "Alice | 0x7DFFAS8fb2AC5b6730729a972eF182326a287C4dC"</code>
      </p>

      <p>
        The first month starts from 21 August to 21 September 2020. The size of
        the reward pool for the second month, if Robonomics CC1 is not launched
        by the end of September, will be determined until September 15.
      </p>

      <p>
        Please note that we have almost multiplied the maximum XRT reward for
        active members. So hopefully this will be an incentive to help us with
        documentation, tools and tests! New contests will be published
        throughout September. Also send your suggestions, we will add, discuss
        and send in response a reward for the work :)
      </p>

      <p>
        <b>Thanks to everyone who has already participated for your support! And
        who will dive further - you won’t be forgotten!</b>
      </p>

      <p>
        P.S. : do not lose your keys to the accounts you use. It may still be
        useful when Robonomics CC1 is launched
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <h2>Please unstake your XRT, regarding it's not necessary after 21 august. See new rules above.</h2>
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
