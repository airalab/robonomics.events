<template>
  <div class="page">
    <h1>XRT Liquidity stake reward calc</h1>
    <Chart
      v-if="canChart && !load"
      ref="chart"
      :log="points"
      :staked="stakedPoint"
    />
    <div v-if="error" class="error">
      Your browser doesn't support wasm
    </div>
    <div v-if="load">Loading...</div>
    <div class="tb" v-else>
      <div class="row">
        <div class="col">Uniswap staked</div>
        <div class="col-left">{{ uniswap }} XRT</div>
      </div>
      <div class="row">
        <div class="col">Pancake staked</div>
        <div class="col-left">{{ pancake }} XRT</div>
      </div>
      <div class="row">
        <div class="col">Total staked</div>
        <div class="col-left">{{ staked }} XRT</div>
      </div>
      <div class="row">
        <div class="col">Real-time circulation</div>
        <div class="col-left">{{ total }} XRT</div>
      </div>
    </div>
    <h2>Why stake?</h2>
    <p>25% year emission</p>
    <p>50% targeted active staking</p>
    <br />
    <a
      href="https://app.uniswap.org/#/add/0x7de91b204c1c737bcee6f000aaa6569cf7061cb7/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
      target="_blank"
      class="btn-red"
      >Add XRT / ETH Liquidity on Uniswap</a
    >
    <a
      href="https://exchange.pancakeswap.finance/#/add/0xC0A51ac9d548BdcDe53Fa59448029e41A39FEB20/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
      target="_blank"
      class="btn-red"
      >Add XRT / BUSD Liquidity on Pancake</a
    >
    <h2>XRT Liquidity events last updates</h2>
    <div style="width: 1024px; margin: 0 auto; text-align: left;">
      <ul>
        <li>
          The reward will change from the const amount to the weekly reward
          calculation algorithm.
        </li>
        <li>
          New XRT Liquidity pool staking reward distribution algorithm similar
          to
          <a
            href="https://wiki.polkadot.network/docs/en/learn-staking#inflation"
            target="_blank"
            >Polkadot Inflation</a
          >. Depending on the staking participation, the distribution of the
          emission to liquidity providers will change dynamically to provide
          incentives to participate (or not participate) in staking.
        </li>
        <li>
          The ideal stake will be 50% of real-time circulation XRT. For example,
          now real-time circ is 182,559 XRT and staked 29,114 XRT ~16%.
        </li>
        <li>
          XRT Inflation is designed to be up to 25% in the first year, and
          before we launch Robonomics Parachain CC1 emission of XRT will be
          distributed for XRT Liquidity providers.
        </li>
        <li>
          Minimal XRT Inflation designed to be 5%. It means the corridor for XRT
          Liquidity pool staking reward distribution algorithm is 5% - 25% of
          real-time circulation.
        </li>
        <li>
          From March 31st, 2021, the minimum stake eligible for the reward will
          be 0.025% of the cumulative XRT/ETH & XRT/BUSD pools.
        </li>
        <li>
          This application is a useful tool to get actual data regarding
          real-time circ, current stake amount and weekly reward estimation.
        </li>
      </ul>
      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRpSXinniUIYVr37zWXJDG8PXGY9Xpl0iLLCaBE-ZWUBRHO45pw7wPF6_rQThpqKbE_0cleMy57-18R/pubhtml?gid=1850083171&amp;single=true&amp;widget=true&amp;headers=false"
      ></iframe>
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import Chart from "../components/Chart.vue";
import init, { total_payout } from "../rewards/xrt_lp_rewards.js";
import config from "../config";
import ABI from "../abi/token.json";
import Web3 from "web3";

export default {
  components: {
    Chart,
  },
  data() {
    return {
      account: null,
      contract: null,
      error: false,
      canChart: false,
      load: false,
      points: [],
      stakedPoint: [],
      uniswap: "0",
      pancake: "0",
      staked: "0",
      total: "0",
    };
  },
  async mounted() {
    this.contract = new this.$web3.eth.Contract(ABI, config.XRT);

    try {
      this.load = true;
      await this.loadStaked();
      await this.loadTotal();
      this.load = false;
      await init("xrt_lp_rewards_bg.wasm");
      this.canChart = true;
      this.draw();
    } catch (error) {
      this.canChart = false;
      this.load = false;
      this.error = true;
      console.log(error);
    }
  },
  methods: {
    async loadStaked() {
      this.uniswap = await this.loadStakedUniswap();
      this.pancake = await this.loadStakedPancake();
      this.staked = Number(this.uniswap) + Number(this.pancake);
    },
    async loadStakedPancake() {
      const provider = new Web3.providers.HttpProvider(config.BINANCE.PROVIDER);
      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(ABI, config.BINANCE.XRT);
      const result = await contract.methods
        .balanceOf(config.BINANCE.PANCAKE)
        .call();
      return Math.round(Number(result) / 1000000000).toString();
    },
    async loadStakedUniswap() {
      const result = await this.contract.methods
        .balanceOf(config.UNISWAP)
        .call();
      return Math.round(Number(result) / 1000000000).toString();
    },
    async loadTotal() {
      const asd = new Promise((r) => {
        setTimeout(() => {
          r();
        }, 3000);
      });
      await asd;
      const tokensupply = await this.contract.methods.totalSupply().call();
      const dutchAuction = await this.contract.methods
        .balanceOf(config.DutchAuction)
        .call();
      const DAO = await this.contract.methods.balanceOf(config.DAO).call();
      const publicAmbix = await this.contract.methods
        .balanceOf(config.PublicAmbix)
        .call();
      this.total = Math.round(
        (Number(tokensupply) -
          Number(dutchAuction) -
          Number(DAO) -
          Number(publicAmbix)) /
          1000000000
      ).toString();
    },
    async draw() {
      const points = [];
      const total = Number(this.total) * 1000000000;
      const step = Math.round(Number(total) / 100);
      for (let index = 0; index < 100; index++) {
        const payout = await total_payout(
          (step * index).toString(),
          total.toString()
        );
        points.push([(step * index) / 1000000000, Number(payout) / 1000000000]);
      }
      const total_reward = await total_payout(
        total.toString(),
        total.toString()
      );
      points.push([total / 1000000000, Number(total_reward) / 1000000000]);
      const payout = await total_payout(
        Math.round(Number(this.staked) * 1000000000).toString(),
        total.toString()
      );
      this.stakedPoint = [[Number(this.staked), Number(payout) / 1000000000]];
      this.points = points;
    },
  },
};
</script>

<style scoped>
.page {
  text-align: center;
}
.tb {
  width: 310px;
  margin: 40px auto;
}
.tb .row {
  margin: 10px;
  overflow: hidden;
}
.tb .col {
  float: left;
  width: 50%;
  text-align: right;
}
.tb .col-left {
  text-align: left;
  padding-left: 20px;
  font-weight: bold;
  float: left;
}
button {
  font-size: 20px;
  padding: 10px;
}
.btn-red {
  display: inline-block;
  background-color: #2e9a21;
  border: 1px solid #478a43;
  width: 300px;
  color: blanchedalmond;
  margin: 5px;
  padding: 10px;
  text-decoration: none;
  text-align: center;
}
.btn-red:hover {
  background-color: #44713f;
  border: 1px solid #478a43;
}
li {
  margin: 15px;
}
iframe {
  width: 100%;
  height: 500px;
}
.error {
  color: #ff5959;
  font-size: 16px;
  font-weight: bold;
}
</style>
